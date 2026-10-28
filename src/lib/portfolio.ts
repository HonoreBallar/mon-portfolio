import "server-only";
import { asc, eq } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";
import { getDb, tables } from "@/db";
import type { Locale } from "@/i18n/config";
import { FALLBACK_PORTFOLIO, type Category, type Portfolio } from "./data";
import { englishFallback } from "./data.en";

/** Cache tag invalidated by the admin after each change */
export const PORTFOLIO_TAG = "portfolio";

/** English text when it exists, French otherwise */
const pick = (locale: Locale, fr: string, en: string | null) => (locale === "en" && en ? en : fr);

/**
 * Portfolio content managed in the admin, in the requested language. Cached until
 * an admin change calls updateTag(PORTFOLIO_TAG).
 */
export async function getPortfolio(locale: Locale): Promise<Portfolio> {
  "use cache";
  cacheTag(PORTFOLIO_TAG);

  try {
    const db = getDb();

    const [settings, stats, stack, expertise, projects, pipeline, timeline, socials] = await Promise.all([
      db.select().from(tables.siteSettings).limit(1),
      db.select().from(tables.stats).orderBy(asc(tables.stats.position), asc(tables.stats.id)),
      db.select().from(tables.technologies).orderBy(asc(tables.technologies.position), asc(tables.technologies.id)),
      db.select().from(tables.expertise).orderBy(asc(tables.expertise.position), asc(tables.expertise.id)),
      db
        .select()
        .from(tables.projects)
        .where(eq(tables.projects.visible, true))
        .orderBy(asc(tables.projects.position), asc(tables.projects.id)),
      db.select().from(tables.pipelineSteps).orderBy(asc(tables.pipelineSteps.position), asc(tables.pipelineSteps.id)),
      db.select().from(tables.timelineEntries).orderBy(asc(tables.timelineEntries.position), asc(tables.timelineEntries.id)),
      db.select().from(tables.socialLinks).orderBy(asc(tables.socialLinks.position), asc(tables.socialLinks.id)),
    ]);

    const s = settings[0];
    cacheLife("max");
    return {
      contactEmail: s?.contactEmail ?? FALLBACK_PORTFOLIO.contactEmail,
      roles: (locale === "en" && s?.rolesEn?.length ? s.rolesEn : s?.roles) ?? [],
      stats: stats.map((r) => ({ value: r.value, label: pick(locale, r.label, r.labelEn) })),
      stack: stack.map(({ name, color }) => ({ name, color })),
      expertise: expertise.map((r) => ({
        title: pick(locale, r.title, r.titleEn),
        text: pick(locale, r.text, r.textEn),
        tags: r.tags,
        icon: r.icon as Portfolio["expertise"][number]["icon"],
        color: r.color,
      })),
      projects: projects.map((p) => ({
        title: pick(locale, p.title, p.titleEn),
        description: pick(locale, p.description, p.descriptionEn),
        category: p.category as Category,
        tags: p.tags,
        glow: p.glow,
        demo: p.demoUrl,
        source: p.sourceUrl,
      })),
      pipeline: pipeline.map((r) => ({
        n: r.number,
        title: pick(locale, r.title, r.titleEn),
        text: pick(locale, r.text, r.textEn),
        color: r.color,
      })),
      timeline: timeline.map((r) => ({
        period: pick(locale, r.period, r.periodEn),
        title: pick(locale, r.title, r.titleEn),
        text: pick(locale, r.text, r.textEn),
      })),
      socials: socials.map(({ label, href }) => ({ label, href })),
    };
  } catch (error) {
    console.error("Database unavailable, using fallback content:", error);
    // Retry soon rather than keeping the fallback content for long
    cacheLife("minutes");
    return locale === "en" ? englishFallback(FALLBACK_PORTFOLIO) : FALLBACK_PORTFOLIO;
  }
}
