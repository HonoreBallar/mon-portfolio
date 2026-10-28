import { CATEGORIES } from "@/lib/data";

export type FieldType = "text" | "textarea" | "color" | "number" | "tags" | "select" | "checkbox" | "url";

export type Field = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  max?: number;
  options?: readonly string[];
  help?: string;
};

export type Resource = {
  key: string;
  label: string;
  singular: string;
  fields: Field[];
  /** Fields shown in the list view */
  columns: string[];
};

const position: Field = { name: "position", label: "Position", type: "number", help: "Ordre d'affichage (croissant)." };

/** French field followed by its optional English version ("<name>En" column) */
function translated(field: Field): Field[] {
  return [
    { ...field, label: `${field.label} (FR)` },
    {
      ...field,
      name: `${field.name}En`,
      label: `${field.label} (EN)`,
      required: false,
      help: "Version anglaise du site. Vide = texte français.",
    },
  ];
}
const color: Field = { name: "color", label: "Couleur", type: "color", required: true };

/** Content editable in the admin; the table of each resource is in resource-tables.ts */
export const RESOURCES: Resource[] = [
  {
    key: "projects",
    label: "Projets",
    singular: "projet",
    columns: ["title", "category", "visible"],
    fields: [
      ...translated({ name: "title", label: "Titre", type: "text", required: true, max: 150 }),
      ...translated({ name: "description", label: "Description", type: "textarea", required: true }),
      { name: "category", label: "Catégorie", type: "select", required: true, options: CATEGORIES },
      { name: "tags", label: "Tags", type: "tags", help: "Séparés par des virgules." },
      { name: "glow", label: "Couleur du halo", type: "text", required: true, max: 20, help: "Format R, G, B — ex. 139, 92, 246" },
      { name: "demoUrl", label: "Lien démo", type: "url", help: "Laisser vide pour masquer le bouton." },
      { name: "sourceUrl", label: "Lien code source", type: "url", help: "Laisser vide pour masquer le bouton." },
      { name: "visible", label: "Visible sur le site", type: "checkbox" },
      position,
    ],
  },
  {
    key: "timeline",
    label: "Parcours",
    singular: "étape du parcours",
    columns: ["period", "title"],
    fields: [
      ...translated({ name: "period", label: "Période", type: "text", required: true, max: 60 }),
      ...translated({ name: "title", label: "Titre", type: "text", required: true, max: 150 }),
      ...translated({ name: "text", label: "Texte", type: "textarea", required: true }),
      position,
    ],
  },
  {
    key: "expertise",
    label: "Expertise",
    singular: "expertise",
    columns: ["title", "icon"],
    fields: [
      ...translated({ name: "title", label: "Titre", type: "text", required: true, max: 100 }),
      ...translated({ name: "text", label: "Texte", type: "textarea", required: true }),
      { name: "tags", label: "Tags", type: "tags", help: "Séparés par des virgules." },
      { name: "icon", label: "Icône", type: "select", required: true, options: ["code", "chip", "cloud"] },
      color,
      position,
    ],
  },
  {
    key: "certifications",
    label: "Certifications",
    singular: "certification",
    columns: ["title", "category"],
    fields: [
      { name: "title", label: "Titre", type: "text", required: true, max: 150 },
      {
        name: "category",
        label: "Catégorie",
        type: "select",
        required: true,
        options: CATEGORIES,
        help: "Affichée sous la carte Expertise correspondante (Fullstack, IA ou DevOps).",
      },
      { name: "verifyUrl", label: "Lien de vérification", type: "url", required: true, help: "Ex. https://coursera.org/verify/..." },
      position,
    ],
  },
  {
    key: "technologies",
    label: "Technologies",
    singular: "technologie",
    columns: ["name", "color"],
    fields: [{ name: "name", label: "Nom", type: "text", required: true, max: 60 }, color, position],
  },
  {
    key: "stats",
    label: "Chiffres clés",
    singular: "chiffre clé",
    columns: ["value", "label"],
    fields: [
      { name: "value", label: "Valeur", type: "text", required: true, max: 30 },
      ...translated({ name: "label", label: "Libellé", type: "text", required: true, max: 100 }),
      position,
    ],
  },
  {
    key: "pipeline",
    label: "Pipeline DevOps",
    singular: "étape du pipeline",
    columns: ["number", "title"],
    fields: [
      { name: "number", label: "Numéro", type: "text", required: true, max: 5 },
      ...translated({ name: "title", label: "Titre", type: "text", required: true, max: 60 }),
      ...translated({ name: "text", label: "Texte", type: "text", required: true, max: 255 }),
      color,
      position,
    ],
  },
  {
    key: "socials",
    label: "Réseaux sociaux",
    singular: "lien",
    columns: ["label", "href"],
    fields: [
      { name: "label", label: "Libellé", type: "text", required: true, max: 50 },
      { name: "href", label: "URL", type: "url", required: true },
      position,
    ],
  },
];

export const SETTINGS_FIELDS: Field[] = [
  { name: "contactEmail", label: "Email de contact", type: "text", required: true, max: 180 },
  { name: "roles", label: "Spécialités animées du hero (FR)", type: "tags", help: "Séparées par des virgules." },
  {
    name: "rolesEn",
    label: "Spécialités animées du hero (EN)",
    type: "tags",
    help: "Séparées par des virgules. Vide = version française.",
  },
];

export function findResource(key: string): Resource | undefined {
  return RESOURCES.find((r) => r.key === key);
}
