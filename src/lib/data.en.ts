import { EXPERTISE, PIPELINE, PROJECTS, STATS, TIMELINE, type Portfolio } from "./data";

/**
 * English version of the fallback content, in the same order as data.ts.
 * Also used by scripts/translate-content.mts to fill the "*En" database columns.
 */
export const ROLES_EN = ["LLM & RAG integration", "Python · FastAPI · Next.js", "DevOps & CI/CD", "Web & mobile apps"];

export const STATS_EN = ["years of experience", "major projects delivered", "IBM & Coursera certifications"];

export const EXPERTISE_EN = [
  {
    title: "Full-stack web & mobile",
    text: "End-to-end web and mobile applications: REST API design, Spring Boot, Laravel or FastAPI back ends, Angular and Next.js front ends, and React Native apps published on the App Store and Google Play.",
  },
  {
    title: "Artificial intelligence",
    text: "RAG systems in production that let users query a document corpus in natural language: ingestion, chunking, embeddings, semantic search and LLM integration via API. Designing AI agents with LangGraph, CrewAI and MCP.",
  },
  {
    title: "DevOps & deployment",
    text: "Docker containerization, CI/CD pipelines with GitHub Actions, Nginx and automated application deployment, with a strong focus on reliability and observability.",
  },
];

export const PROJECTS_EN = [
  {
    title: "Cockpit 360 — AI decision assistant",
    description:
      "Neurones Technologies · RAG system in production for querying a document corpus in natural language: ingestion, chunking, embeddings and vector database, LLMs integrated via API, containerized with Docker and shipped with GitHub Actions CI/CD.",
  },
  {
    title: "Bank customer onboarding — BACI",
    description:
      "Neurones Technologies · Digitalization of the account-opening journey for Banque Atlantique Côte d'Ivoire: document validation, case processing, secure exchanges and user role management.",
  },
  {
    title: "Diamondock — E-commerce mobile app",
    description:
      "JARS Technologies · iOS and Android app published on the App Store and Google Play: product catalog, cart, order tracking, authentication and back-end API integration.",
  },
  {
    title: "Winimall — SaaS marketplace",
    description:
      "JARS Technologies · Multi-vendor platform: store, product and order management. Design and development of the API, the front end and their integration.",
  },
  {
    title: "YEQUA — Hotel booking platform",
    description:
      "JUNI-CORE SARL · Back-end development of a platform offering over 1,000 hotel rooms, residences and apartments in Côte d'Ivoire: management of professionals and hotels, bookings and the back office.",
  },
  {
    title: "My portfolio — Next.js & custom admin",
    description:
      "Personal project · Portfolio and back office in a single Next.js 16 application: custom admin (authentication, full content management, contact messages), PostgreSQL with Drizzle ORM, Docker image and GitHub Actions CI/CD, deployed on Vercel with Neon.",
  },
];

export const PIPELINE_EN = [
  { title: "Code", text: "Code review, clean code, tests" },
  { title: "Build", text: "Reproducible Docker images" },
  { title: "Test", text: "Automated tests in GitHub Actions" },
  { title: "Deploy", text: "Docker Compose, Nginx, automated deployment" },
  { title: "Monitor", text: "Logs, metrics and observability" },
];

export const TIMELINE_EN = [
  {
    period: "June 2025 — Present",
    title: "AI & DevOps Developer · Neurones Technologies",
    text: "Shipped a RAG system to production (Cockpit 360), digitalized bank customer onboarding for Banque Atlantique (Spring Boot, Angular) and automated application deployments.",
  },
  {
    period: "Oct. 2023 — May 2025",
    title: "Web & Mobile Developer · JARS Technologies",
    text: "Built and published the Diamondock React Native app on iOS and Android, and contributed to the Winimall SaaS marketplace (Laravel).",
  },
  {
    period: "Feb. 2023 — Sept. 2023",
    title: "Full-stack Web Developer · SOFTSYS",
    text: "Designed and integrated APIs connecting user interfaces to business services, and improved search engine optimization (SEO).",
  },
  {
    period: "2026",
    title: "IBM Certifications · Coursera",
    text: "Five IBM Professional Certificates (RAG and Agentic AI, Full Stack, Front-End, Back-End, DevOps and Software Engineering) and the Mobile App Development, UX and Publishing specialization (SkillUp).",
  },
  {
    period: "2014 — 2019",
    title: "Professional Bachelor's in Software Engineering · CESA Plateau",
    text: "Professional bachelor's degree in software engineering (2019), after a two-year BTS in application development (2015).",
  },
];

export function englishFallback(fr: Portfolio): Portfolio {
  return {
    ...fr,
    roles: ROLES_EN,
    stats: STATS.map((s, i) => ({ ...s, label: STATS_EN[i] ?? s.label })),
    expertise: EXPERTISE.map((e, i) => ({ ...e, ...EXPERTISE_EN[i] })),
    projects: PROJECTS.map((p, i) => ({ ...p, ...PROJECTS_EN[i] })),
    pipeline: PIPELINE.map((s, i) => ({ ...s, ...PIPELINE_EN[i] })),
    timeline: TIMELINE.map((t, i) => ({ ...t, ...TIMELINE_EN[i] })),
  };
}
