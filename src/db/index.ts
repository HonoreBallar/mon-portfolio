import "server-only";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

function createClient() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set");
  // Short timeouts: when the database is down the site falls back to static content instead of hanging
  return postgres(url, { max: 5, connect_timeout: 5, idle_timeout: 20, prepare: false });
}

// Reuse one connection pool across hot reloads in development
const globalForDb = globalThis as unknown as { sql?: ReturnType<typeof postgres> };

export function getDb() {
  globalForDb.sql ??= createClient();
  return drizzle(globalForDb.sql, { schema });
}

export * as tables from "./schema";
