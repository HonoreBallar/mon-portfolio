import "server-only";
import type { AnyPgColumn, PgTable } from "drizzle-orm/pg-core";
import { tables } from "@/db";

type ContentTable = PgTable & { id: AnyPgColumn; position: AnyPgColumn };

/** Database table behind each admin resource (see resources.ts) */
export const RESOURCE_TABLES: Record<string, ContentTable> = {
  projects: tables.projects,
  timeline: tables.timelineEntries,
  expertise: tables.expertise,
  technologies: tables.technologies,
  stats: tables.stats,
  pipeline: tables.pipelineSteps,
  socials: tables.socialLinks,
};
