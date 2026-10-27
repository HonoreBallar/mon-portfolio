export const NAV = [
  { label: "Expertise", href: "#expertise" },
  { label: "Projets", href: "#projets" },
  { label: "DevOps", href: "#devops" },
  { label: "Parcours", href: "#parcours" },
];

export const ROLES = [
  "Développeur IA full-stack",
  "Intégrateur LLM & RAG",
  "Ingénieur DevOps",
  "Développeur web & mobile",
];

export const STATS = [
  { value: "3+", label: "ans d'expérience" },
  { value: "5", label: "projets majeurs livrés" },
  { value: "4", label: "certifications IBM & Coursera" },
];

export const STACK = [
  { name: "Python", color: "#facc15" },
  { name: "FastAPI", color: "#14b8a6" },
  { name: "LLM / RAG", color: "#a78bfa" },
  { name: "Next.js", color: "#f4f6fb" },
  { name: "TypeScript", color: "#3b82f6" },
  { name: "Angular", color: "#f87171" },
  { name: "React Native", color: "#38bdf8" },
  { name: "Expo", color: "#f4f6fb" },
  { name: "Java", color: "#f97316" },
  { name: "Spring Boot", color: "#34d399" },
  { name: "PHP", color: "#818cf8" },
  { name: "Laravel", color: "#f87171" },
  { name: "Symfony", color: "#f4f6fb" },
  { name: "PostgreSQL", color: "#60a5fa" },
  { name: "Docker", color: "#0ea5e9" },
  { name: "GitHub Actions", color: "#f4f6fb" },
  { name: "Nginx", color: "#34d399" },
];

export type Category = "Fullstack" | "IA" | "DevOps";

export const CATEGORIES: Category[] = ["Fullstack", "IA", "DevOps"];

export const EXPERTISE: {
  title: string;
  text: string;
  tags: string[];
  icon: "code" | "chip" | "cloud";
  color: string;
}[] = [
  {
    title: "Fullstack web & mobile",
    text: "Applications web et mobiles de bout en bout : conception d'API REST, back-ends Spring Boot, Laravel ou FastAPI, interfaces Angular et Next.js, applications React Native publiées sur l'App Store et Google Play.",
    tags: ["Spring Boot / Laravel", "Angular / Next.js", "React Native"],
    icon: "code",
    color: "#22d3ee",
  },
  {
    title: "Intelligence artificielle",
    text: "Systèmes RAG en production pour interroger un corpus documentaire en langage naturel : ingestion, chunking, embeddings, recherche sémantique et intégration de LLM via API. Conception d'agents IA en cours.",
    tags: ["LLM / RAG", "Python / FastAPI", "Embeddings"],
    icon: "chip",
    color: "#a78bfa",
  },
  {
    title: "DevOps & déploiement",
    text: "Conteneurisation Docker, pipelines CI/CD avec GitHub Actions, Nginx et déploiement automatisé des applications, avec une attention particulière à la fiabilité et à l'observabilité.",
    tags: ["Docker", "GitHub Actions", "Nginx"],
    icon: "cloud",
    color: "#34d399",
  },
];

export const PROJECTS: {
  title: string;
  description: string;
  category: Category;
  tags: string[];
  glow: string;
  demo: string;
  source: string;
}[] = [
  {
    title: "Cockpit 360 — Assistant IA décisionnel",
    description:
      "Neurones Technologies · Système RAG mis en production pour interroger un corpus documentaire en langage naturel : ingestion, chunking, embeddings et base vectorielle, LLM intégrés via API, conteneurisé avec Docker et livré en CI/CD GitHub Actions.",
    category: "IA",
    tags: ["Python", "RAG / LLM", "FastAPI", "Next.js", "Docker"],
    glow: "139, 92, 246",
    demo: "#",
    source: "#",
  },
  {
    title: "Entrée en relation bancaire — BACI",
    description:
      "Neurones Technologies · Digitalisation du parcours d'ouverture de compte de Banque Atlantique Côte d'Ivoire : validation documentaire, traitement des dossiers, sécurisation des échanges et gestion des rôles utilisateurs.",
    category: "Fullstack",
    tags: ["Spring Boot", "Angular", "API REST"],
    glow: "14, 165, 233",
    demo: "#",
    source: "#",
  },
  {
    title: "Diamondock — App mobile e-commerce",
    description:
      "JARS Technologies · Application iOS et Android publiée sur l'App Store et Google Play : catalogue produits, panier, suivi des commandes, authentification et intégration des API backend.",
    category: "Fullstack",
    tags: ["React Native", "Expo", "API REST"],
    glow: "16, 185, 129",
    demo: "#",
    source: "#",
  },
  {
    title: "Winimall — Marketplace SaaS",
    description:
      "JARS Technologies · Plateforme multi-vendeurs : gestion des boutiques, des produits et des commandes. Conception et développement de l'API, du front et de leur intégration.",
    category: "Fullstack",
    tags: ["Laravel", "API REST", "SQL", "Bootstrap"],
    glow: "236, 72, 153",
    demo: "#",
    source: "#",
  },
  {
    title: "YEQUA — Réservation hôtelière",
    description:
      "JUNI-CORE SARL · Développement backend d'une plateforme proposant plus de 1 000 chambres d'hôtels, résidences et appartements en Côte d'Ivoire : gestion des professionnels et des hôtels, des réservations et du back-office.",
    category: "Fullstack",
    tags: ["PHP", "Symfony", "Bootstrap"],
    glow: "245, 158, 11",
    demo: "#",
    source: "#",
  },
];

export const PIPELINE = [
  { n: "01", title: "Code", text: "Revue de code, Clean Code, tests", color: "#22d3ee" },
  { n: "02", title: "Build", text: "Images Docker reproductibles", color: "#60a5fa" },
  { n: "03", title: "Test", text: "Tests automatisés dans GitHub Actions", color: "#a78bfa" },
  { n: "04", title: "Deploy", text: "Docker Compose, Nginx, déploiement automatisé", color: "#34d399" },
  { n: "05", title: "Monitor", text: "Logs, métriques et observabilité", color: "#fbbf24" },
];

export const TIMELINE = [
  {
    period: "Juin 2025 — Aujourd'hui",
    title: "Développeur IA & DevOps · Neurones Technologies",
    text: "Mise en production d'un système RAG (Cockpit 360), digitalisation de l'entrée en relation bancaire pour Banque Atlantique (Spring Boot, Angular) et déploiement automatisé des applications.",
  },
  {
    period: "Oct. 2023 — Mai 2025",
    title: "Développeur web & mobile · JARS Technologies",
    text: "Développement et publication de l'application React Native Diamondock sur iOS et Android, et participation à la marketplace SaaS Winimall (Laravel).",
  },
  {
    period: "Févr. 2023 — Sept. 2023",
    title: "Développeur full-stack web · SOFTSYS",
    text: "Conception et intégration d'API reliant les interfaces utilisateur aux services métier, et optimisation du référencement naturel (SEO).",
  },
  {
    period: "2026",
    title: "Certifications IBM · Coursera",
    text: "IBM RAG and Agentic AI, IBM DevOps, Cloud and Agile Foundations, IBM Front-End Developer, et Mobile App Development, UX and Publishing (SkillUp).",
  },
  {
    period: "2014 — 2019",
    title: "Licence pro Génie Logiciel · CESA Plateau",
    text: "Licence professionnelle en Génie Logiciel (2019), après un BTS Informatique développeur d'application (2015).",
  },
];

export const SOCIALS = [
  { label: "GitHub", href: "https://github.com/HonoreBallar" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/honor%C3%A9-amounan-38816913a" },
];

/** Shape of GET /api/portfolio on the Symfony backend */
export type Portfolio = {
  contactEmail: string;
  roles: string[];
  stats: typeof STATS;
  stack: typeof STACK;
  expertise: typeof EXPERTISE;
  projects: typeof PROJECTS;
  pipeline: typeof PIPELINE;
  timeline: typeof TIMELINE;
  socials: typeof SOCIALS;
};

/** Content shown when the backend is unreachable */
export const FALLBACK_PORTFOLIO: Portfolio = {
  contactEmail: "amounahonore@gmail.com",
  roles: ROLES,
  stats: STATS,
  stack: STACK,
  expertise: EXPERTISE,
  projects: PROJECTS,
  pipeline: PIPELINE,
  timeline: TIMELINE,
  socials: SOCIALS,
};
