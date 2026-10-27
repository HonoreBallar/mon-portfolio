import "server-only";
import { eq } from "drizzle-orm";
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getDb, tables } from "@/db";

export const SESSION_COOKIE = "admin_session";
const SESSION_HOURS = 8;

function secretKey(): Uint8Array {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) throw new Error("SESSION_SECRET must be set (32 characters minimum)");
  return new TextEncoder().encode(secret);
}

export async function createSession(userId: number): Promise<void> {
  const token = await new SignJWT({})
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(String(userId))
    .setIssuedAt()
    .setExpirationTime(`${SESSION_HOURS}h`)
    .sign(secretKey());

  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_HOURS * 60 * 60,
  });
}

export async function deleteSession(): Promise<void> {
  (await cookies()).delete(SESSION_COOKIE);
}

/** Returns the logged-in admin, or redirects to the login page */
export async function requireAdmin(): Promise<{ id: number; email: string }> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) redirect("/admin/login");

  let userId: number;
  try {
    const { payload } = await jwtVerify(token, secretKey(), { algorithms: ["HS256"] });
    userId = Number(payload.sub);
  } catch {
    redirect("/admin/login");
  }

  const [user] = await getDb()
    .select({ id: tables.users.id, email: tables.users.email, roles: tables.users.roles })
    .from(tables.users)
    .where(eq(tables.users.id, userId));
  if (!user || !user.roles.includes("ROLE_ADMIN")) redirect("/admin/login");

  return { id: user.id, email: user.email };
}
