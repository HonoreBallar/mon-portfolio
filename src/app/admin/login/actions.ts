"use server";

import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { getDb, tables } from "@/db";
import { createSession } from "@/lib/auth";

export type LoginState = { error?: string; email?: string } | undefined;

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  const [user] = await getDb().select().from(tables.users).where(eq(tables.users.email, email));
  // Hashes created by Symfony ($2y$) are standard bcrypt and are accepted by bcryptjs
  const valid = user !== undefined && user.roles.includes("ROLE_ADMIN") && (await bcrypt.compare(password, user.password));

  if (!valid) {
    // Slows down password guessing
    await new Promise((r) => setTimeout(r, 800));
    return { error: "Email ou mot de passe incorrect.", email };
  }

  await createSession(user.id);
  redirect("/admin");
}
