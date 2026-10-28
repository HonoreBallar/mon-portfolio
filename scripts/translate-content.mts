// Fills the English columns ("*_en") from src/lib/data.en.ts, matching rows on their French text.
// Only empty translations are filled: what was typed in the admin is never overwritten.
// Usage: npm run db:translate   (DATABASE_URL from the environment or .env.local)
import { and, eq, isNull, or, sql } from "drizzle-orm";
import type { AnyPgColumn, PgTable } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as t from "../src/db/schema";
import { EXPERTISE, PIPELINE, PROJECTS, STATS, TIMELINE } from "../src/lib/data";
import { EXPERTISE_EN, PIPELINE_EN, PROJECTS_EN, ROLES_EN, STATS_EN, TIMELINE_EN } from "../src/lib/data.en";

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not set");
  process.exit(1);
}
const client = postgres(process.env.DATABASE_URL, { max: 1 });
const db = drizzle(client);

const empty = (column: AnyPgColumn) => or(isNull(column), eq(column, ""));
const missing: string[] = [];

/** Sets `values` on the row whose `key` column equals `frenchKey`, if `check` column is still empty */
async function fill(table: PgTable, label: string, key: AnyPgColumn, frenchKey: string, check: AnyPgColumn, values: object) {
  const updated = await db.update(table).set(values).where(and(eq(key, frenchKey), empty(check))).returning({ id: sql`1` });
  if (updated.length === 0) {
    const [{ n }] = await db.select({ n: sql<number>`count(*)::int` }).from(table).where(eq(key, frenchKey));
    if (n === 0) missing.push(`${label} : « ${frenchKey} » introuvable`);
  }
  return updated.length;
}

let count = 0;
for (const [i, s] of STATS.entries()) {
  count += await fill(t.stats, "Chiffre clé", t.stats.label, s.label, t.stats.labelEn, { labelEn: STATS_EN[i] });
}
for (const [i, e] of EXPERTISE.entries()) {
  const en = EXPERTISE_EN[i];
  count += await fill(t.expertise, "Expertise", t.expertise.title, e.title, t.expertise.titleEn, { titleEn: en.title, textEn: en.text });
}
for (const [i, p] of PROJECTS.entries()) {
  const en = PROJECTS_EN[i];
  count += await fill(t.projects, "Projet", t.projects.title, p.title, t.projects.titleEn, {
    titleEn: en.title,
    descriptionEn: en.description,
  });
}
for (const [i, s] of PIPELINE.entries()) {
  const en = PIPELINE_EN[i];
  count += await fill(t.pipelineSteps, "Pipeline", t.pipelineSteps.number, s.n, t.pipelineSteps.textEn, {
    titleEn: en.title,
    textEn: en.text,
  });
}
for (const [i, e] of TIMELINE.entries()) {
  const en = TIMELINE_EN[i];
  count += await fill(t.timelineEntries, "Parcours", t.timelineEntries.title, e.title, t.timelineEntries.titleEn, {
    periodEn: en.period,
    titleEn: en.title,
    textEn: en.text,
  });
}
const settings = await db
  .update(t.siteSettings)
  .set({ rolesEn: ROLES_EN })
  .where(or(isNull(t.siteSettings.rolesEn), sql`json_array_length(${t.siteSettings.rolesEn}) = 0`))
  .returning({ id: t.siteSettings.id });
count += settings.length;

await client.end();
console.log(`${count} élément(s) traduit(s).`);
if (missing.length) {
  console.log("\nÀ traduire à la main dans l'admin (texte français modifié ou élément absent) :");
  for (const m of missing) console.log(`- ${m}`);
}
