# Portfolio — Amounan Kouadjo Honoré

Portfolio et back-office dans une seule application **Next.js 16** (App Router, Cache Components) :

- **Site public** : contenu lu dans PostgreSQL et mis en cache (`"use cache"`, tag `portfolio`), avec un contenu de secours dans `src/lib/data.ts` si la base est injoignable.
- **Admin** sur `/admin` : connexion par email et mot de passe, gestion des projets, du parcours, de l'expertise, des technologies, des chiffres clés, du pipeline, des réseaux sociaux, des réglages et des messages de contact. Chaque modification met le site à jour immédiatement (`updateTag`).
- **Formulaire de contact** : `POST /api/contact`, validation zod, piège à robots, 5 messages par heure et par IP.
- **Bilingue** : français sur `/`, anglais sur `/en`. Les textes fixes sont dans `src/i18n/dictionaries.ts` ; les contenus de l'admin ont une colonne anglaise (vide = texte français).
- **Partage et SEO** : image d'aperçu générée par langue (`opengraph-image.tsx`), `sitemap.xml`, `robots.txt`, liens `hreflang` et données structurées JSON-LD `Person`.
- **Statistiques** : Vercel Analytics (à activer dans l'onglet *Analytics* du projet Vercel).
- **Stack** : PostgreSQL + Drizzle ORM, sessions JWT signées (jose), bcrypt, Docker, GitHub Actions.

## Développement local

Prérequis : Node.js 24 et Docker.

```bash
npm install
cp .env.example .env.local        # puis renseigner SESSION_SECRET (openssl rand -hex 32)
docker compose up -d db           # PostgreSQL sur le port 5433
npm run db:migrate                # crée les tables
npm run db:translate              # remplit les traductions anglaises vides depuis src/lib/data.en.ts
npm run admin:create -- vous@exemple.com
npm run dev                       # http://localhost:3000 — admin sur /admin
```

### Tout en Docker (image de production)

```bash
docker compose up -d --build      # db + migrations + application sur http://localhost:3000
docker compose logs -f app
docker compose down               # les données restent dans le volume db_data
```

## Scripts

| Commande | Rôle |
|---|---|
| `npm run dev` / `build` / `start` | Next.js |
| `npm run lint` / `typecheck` | ESLint, TypeScript |
| `npm run db:generate` | Crée une migration SQL après une modification de `src/db/schema.ts` |
| `npm run db:migrate` | Applique les migrations de `drizzle/` sur `DATABASE_URL` |
| `npm run db:studio` | Explorateur de la base (Drizzle Studio) |
| `npm run db:translate` | Remplit les traductions anglaises encore vides (ne remplace jamais une saisie de l'admin) |
| `npm run admin:create -- email` | Crée un admin ou réinitialise son mot de passe |

## Variables d'environnement

| Variable | Rôle |
|---|---|
| `DATABASE_URL` | Connexion PostgreSQL |
| `SESSION_SECRET` | Signe le cookie de session admin (32 caractères minimum) |
| `NEXT_PUBLIC_SITE_URL` | Facultatif : adresse publique du site (nom de domaine). Sur Vercel, le domaine de production est utilisé par défaut |

## Structure

```
src/app/[lang]/                  site public (layout, page, image d'aperçu) en fr et en
src/i18n/                        langues et textes fixes du site
src/lib/data.en.ts               contenu de secours en anglais (et source de db:translate)
src/app/sitemap.ts, robots.ts    référencement
assets/og/                       polices et logo de l'image d'aperçu
src/app/api/contact/route.ts     formulaire de contact
src/app/admin/login/             connexion
src/app/admin/(panel)/           admin : tableau de bord, CRUD générique, réglages, messages
src/lib/admin/resources.ts       champs éditables de chaque type de contenu
src/lib/portfolio.ts             lecture du contenu + cache
src/lib/auth.ts                  sessions et contrôle d'accès
src/db/schema.ts                 schéma Drizzle (tables reprises de l'ancien backend Symfony)
src/proxy.ts                     sert le français sur / (/fr redirige vers /) et protège /admin
drizzle/                         migrations SQL versionnées
Dockerfile, compose.yaml         image standalone + image de migration
.github/workflows/ci.yml         CI
```

Pour ajouter un champ ou un type de contenu : modifier `src/db/schema.ts`, lancer `npm run db:generate`,
puis déclarer le champ dans `src/lib/admin/resources.ts` (et la table dans `src/lib/admin/tables.ts`).

## CI (GitHub Actions)

À chaque push et pull request :

1. **quality** : lint, types, migrations sur une base PostgreSQL vide, vérification qu'aucune migration ne manque, build Next.js.
2. **docker** : build de l'image de production et de l'image de migration (cache GitHub Actions).
3. **migrate-production** (push sur `master` uniquement) : applique les migrations sur la base de production si le secret
   `DATABASE_URL` est défini dans l'environnement GitHub `production`.

## Déploiement : Vercel + Neon

1. **Base** : sur Vercel → **Storage** → **Neon** (offre gratuite), ou directement sur neon.tech.
   Récupère la chaîne de connexion **poolée** (`...-pooler...`).
2. **Tables** : `DATABASE_URL="<url neon>" npm run db:migrate`.
3. **Contenu existant** (depuis la base locale) :
   ```bash
   docker compose exec -T db pg_dump -U app -d app --data-only --no-owner --schema=public | psql "<url neon>"
   ```
   Sinon, crée seulement un admin : `DATABASE_URL="<url neon>" npm run admin:create -- vous@exemple.com`.
4. **Vercel** : importe le dépôt GitHub, puis ajoute `DATABASE_URL` et `SESSION_SECRET` (nouvelle valeur, `openssl rand -hex 32`).
   Si la base a été créée depuis Vercel, `DATABASE_URL` est déjà renseignée.
5. **Migrations automatiques** (facultatif) : GitHub → Settings → Environments → `production` → secret `DATABASE_URL`.

Le site est alors sur `https://<projet>.vercel.app` et l'admin sur `https://<projet>.vercel.app/admin`.
