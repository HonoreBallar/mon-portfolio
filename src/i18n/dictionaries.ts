import type { Locale } from "./config";

/** Fixed texts of the public site. Content managed in the admin is translated in the database. */
const fr = {
  meta: {
    title: "Honoré Amounan — Développeur IA full-stack & DevOps",
    description:
      "Développeur IA full-stack & DevOps basé à Abidjan : systèmes RAG en production, intégration de LLM, applications web et mobiles, CI/CD et Docker.",
    ogAlt: "Honoré Amounan — Développeur IA full-stack & DevOps",
  },
  nav: [
    { label: "Expertise", href: "#expertise" },
    { label: "Projets", href: "#projets" },
    { label: "DevOps", href: "#devops" },
    { label: "Parcours", href: "#parcours" },
  ],
  header: { contact: "Me contacter", menu: "Menu", switchLabel: "Read in English", switchShort: "EN" },
  hero: {
    badge: "Disponible pour de nouveaux projets — Abidjan / Remote",
    role: "Développeur IA full-stack & DevOps · Abidjan",
    tagline: { before: "Je construis des produits ", highlight: "intelligents", after: ", du code à la production." },
    mission:
      "Plus de 3 ans d’expérience à concevoir des solutions qui exploitent les modèles de langage — dont un système RAG en production — pour faciliter l’accès à l’information, automatiser les tâches et améliorer les processus métier.",
    ctaProjects: "Voir mes projets",
    ctaContact: "Me contacter",
  },
  expertise: {
    kicker: "01 — Expertise",
    title: ["Trois mondes, une seule", "personne pour les relier."],
    certified: "Certifié",
    verify: "Vérifier",
  },
  projects: {
    kicker: "02 — Projets",
    title: ["Des projets qui tournent", "en production."],
    all: "Tous",
    categories: { Fullstack: "Fullstack", IA: "IA", DevOps: "DevOps" },
    demo: "Démo live",
    source: "Code source",
  },
  pipeline: {
    kicker: "03 — Ma façon de livrer",
    title: ["Du commit à la prod, en", "pilote automatique."],
    deployed: "✓ Déployé en production via GitHub Actions",
  },
  timeline: { kicker: "04 — Parcours", title: "Le chemin jusqu’ici." },
  contact: {
    kicker: "05 — Contact",
    title: ["Un projet ambitieux ?", "Construisons-le."],
    text: "Je réponds rapidement. Parlons de votre produit, de votre assistant IA ou de vos déploiements.",
    name: "Nom",
    namePlaceholder: "Votre nom",
    email: "Email",
    emailPlaceholder: "vous@entreprise.com",
    message: "Votre projet",
    messagePlaceholder: "Décrivez votre idée...",
    button: { idle: "Envoyer le message", sending: "Envoi en cours…", sent: "Message envoyé ✓" },
    errors: {
      tooMany: "Trop de messages envoyés. Réessayez dans une heure.",
      invalid: "Vérifiez votre email et votre message (10 caractères minimum).",
      unavailable: "Le service est momentanément indisponible. Réessayez dans une minute.",
      generic: "Une erreur est survenue. Réessayez ou écrivez-moi directement par email.",
      network: "Impossible d’envoyer le message. Réessayez ou écrivez-moi directement par email.",
    },
  },
  footer: { copyright: "© 2026 Honoré Amounan — Développeur IA full-stack & DevOps", backToTop: "Retour en haut ↑" },
};

export type Dictionary = typeof fr;

const en: Dictionary = {
  meta: {
    title: "Honoré Amounan — Full-stack AI & DevOps Engineer",
    description:
      "Full-stack AI & DevOps engineer based in Abidjan: RAG systems in production, LLM integration, web and mobile apps, CI/CD and Docker.",
    ogAlt: "Honoré Amounan — Full-stack AI & DevOps Engineer",
  },
  nav: [
    { label: "Expertise", href: "#expertise" },
    { label: "Projects", href: "#projets" },
    { label: "DevOps", href: "#devops" },
    { label: "Experience", href: "#parcours" },
  ],
  header: { contact: "Contact me", menu: "Menu", switchLabel: "Lire en français", switchShort: "FR" },
  hero: {
    badge: "Available for new projects — Abidjan / Remote",
    role: "Full-stack AI & DevOps Engineer · Abidjan",
    tagline: { before: "I build ", highlight: "intelligent", after: " products, from code to production." },
    mission:
      "3+ years designing solutions that leverage language models — including a RAG system in production — to make information easier to access, automate tasks and improve business processes.",
    ctaProjects: "See my projects",
    ctaContact: "Contact me",
  },
  expertise: {
    kicker: "01 — Expertise",
    title: ["Three worlds, one", "person to connect them."],
    certified: "Certified",
    verify: "Verify",
  },
  projects: {
    kicker: "02 — Projects",
    title: ["Projects running", "in production."],
    all: "All",
    categories: { Fullstack: "Full-stack", IA: "AI", DevOps: "DevOps" },
    demo: "Live demo",
    source: "Source code",
  },
  pipeline: {
    kicker: "03 — How I ship",
    title: ["From commit to production,", "on autopilot."],
    deployed: "✓ Deployed to production via GitHub Actions",
  },
  timeline: { kicker: "04 — Experience", title: "The journey so far." },
  contact: {
    kicker: "05 — Contact",
    title: ["An ambitious project?", "Let’s build it."],
    text: "I reply quickly. Let’s talk about your product, your AI assistant or your deployments.",
    name: "Name",
    namePlaceholder: "Your name",
    email: "Email",
    emailPlaceholder: "you@company.com",
    message: "Your project",
    messagePlaceholder: "Describe your idea...",
    button: { idle: "Send message", sending: "Sending…", sent: "Message sent ✓" },
    errors: {
      tooMany: "Too many messages sent. Please try again in an hour.",
      invalid: "Please check your email and message (10 characters minimum).",
      unavailable: "The service is temporarily unavailable. Please try again in a minute.",
      generic: "Something went wrong. Please try again or email me directly.",
      network: "The message could not be sent. Please try again or email me directly.",
    },
  },
  footer: { copyright: "© 2026 Honoré Amounan — Full-stack AI & DevOps Engineer", backToTop: "Back to top ↑" },
};

const DICTIONARIES: Record<Locale, Dictionary> = { fr, en };

export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale];
}
