import { createHash } from "node:crypto";
import { and, count, eq, gt } from "drizzle-orm";
import { z } from "zod";
import { getDb, tables } from "@/db";

const MAX_PER_HOUR = 5;

const ContactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().max(180).pipe(z.email()),
  message: z.string().trim().min(10).max(5000),
  // Honeypot: invisible to people, filled by spam bots
  website: z.string().optional().default(""),
});

function clientIpHash(request: Request): string {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
  return createHash("sha256").update(ip).digest("hex");
}

export async function POST(request: Request) {
  const parsed = ContactSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return Response.json({ error: "Données invalides.", issues: z.flattenError(parsed.error).fieldErrors }, { status: 422 });
  }

  const { name, email, message, website } = parsed.data;
  // Bots filling the honeypot get a fake success
  if (website !== "") {
    return Response.json({ status: "sent" }, { status: 201 });
  }

  const db = getDb();
  const ipHash = clientIpHash(request);
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
  const [{ sent }] = await db
    .select({ sent: count() })
    .from(tables.contactMessages)
    .where(and(eq(tables.contactMessages.ipHash, ipHash), gt(tables.contactMessages.createdAt, oneHourAgo)));

  if (sent >= MAX_PER_HOUR) {
    return Response.json({ error: "Trop de messages envoyés, réessayez plus tard." }, { status: 429, headers: { "Retry-After": "3600" } });
  }

  await db.insert(tables.contactMessages).values({ name, email, message, ipHash });
  return Response.json({ status: "sent" }, { status: 201 });
}
