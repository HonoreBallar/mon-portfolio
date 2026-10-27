import "server-only";
import { asc, eq } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";
import { getDb, tables } from "@/db";
import { FALLBACK_PORTFOLIO, type Category, type Portfolio } from "./data";

/** Cache tag invalidated by the admin after each change */
export const PORTFOLIO_TAG = "portfolio";

/**
 * Portfolio content managed in the admin. Cached until an admin change
 * calls updateTag(PORTFOLIO_TAG).
 */
export async function getPortfolio(): Promise<Portfolio> {
  "use cache";
  cacheTag(PORTFOLIO_TAG);

  try {
    const db = getDb();
    const [settings, stats, stack, expertise, projects, pipeline, timeline, socials] = await Promise.all([
      db.select().from(tables.siteSettings).limit(1),
      db.select().from(tables.stats).orderBy(asc(tables.stats.position), asc(tables.stats.id)),
      db.select().from(tables.technologies).orderBy(asc(tables.technologies.position), asc(tables.technologies.id)),
      db.select().from(tables.expertise).orderBy(asc(tables.expertise.position), asc(tables.expertise.id)),
      db.select().from(tables.projects).where(eq(tables.projects.visible, true)).orderBy(asc(tables.projects.position), asc(tables.projects.id)),
      db.select().from(tables.pipelineSteps).orderBy(asc(tables.pipelineSteps.position), asc(tables.pipelineSteps.id)),
      db.select().from(tables.timelineEntries).orderBy(asc(tables.timelineEntries.position), asc(tables.timelineEntries.id)),
      db.select().from(tables.socialLinks).orderBy(asc(tables.socialLinks.position), asc(tables.socialLinks.id)),
    ]);

    cacheLife("max");
    return {
      contactEmail: settings[0]?.contactEmail ?? FALLBACK_PORTFOLIO.contactEmail,
      roles: settings[0]?.roles ?? [],
      stats: stats.map(({ value, label }) => ({ value, label })),
      stack: stack.map(({ name, color }) => ({ name, color })),
      expertise: expertise.map(({ title, text, tags, icon, color }) => ({
        title,
        text,
        tags,
        icon: icon as Portfolio["expertise"][number]["icon"],
        color,
      })),
      projects: projects.map((p) => ({
        title: p.title,
        description: p.description,
        category: p.category as Category,
        tags: p.tags,
        glow: p.glow,
        demo: p.demoUrl,
        source: p.sourceUrl,
      })),
      pipeline: pipeline.map(({ number, title, text, color }) => ({ n: number, title, text, color })),
      timeline: timeline.map(({ period, title, text }) => ({ period, title, text })),
      socials: socials.map(({ label, href }) => ({ label, href })),
    };
  } catch (error) {
    console.error("Database unavailable, using fallback content:", error);
    // Retry soon rather than keeping the fallback content for long
    cacheLife("minutes");
    return FALLBACK_PORTFOLIO;
  }
}
