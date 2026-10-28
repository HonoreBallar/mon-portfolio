"use server";

import { eq } from "drizzle-orm";
import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { getDb, tables } from "@/db";
import { RESOURCE_TABLES } from "@/lib/admin/tables";
import { findResource, SETTINGS_FIELDS } from "@/lib/admin/resources";
import { parseForm, type FormState } from "@/lib/admin/validation";
import { deleteSession, requireAdmin } from "@/lib/auth";
import { PORTFOLIO_TAG } from "@/lib/portfolio";

export async function saveItem(key: string, id: number | null, _prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const resource = findResource(key);
  const table = RESOURCE_TABLES[key];
  if (!resource || !table) throw new Error(`Unknown resource ${key}`);

  const { data, state } = parseForm(resource.fields, formData);
  if (!data) return state;

  const db = getDb();
  // The generic table type cannot describe each table's columns, hence the casts
  if (id === null) await db.insert(table).values(data as never);
  else await db.update(table).set(data as never).where(eq(table.id, id));

  updateTag(PORTFOLIO_TAG);
  redirect(`/admin/${key}`);
}

export async function deleteItem(key: string, id: number): Promise<void> {
  await requireAdmin();
  const table = RESOURCE_TABLES[key];
  if (!table) throw new Error(`Unknown resource ${key}`);

  await getDb().delete(table).where(eq(table.id, id));
  updateTag(PORTFOLIO_TAG);
  redirect(`/admin/${key}`);
}

export async function saveSettings(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const { data, state } = parseForm(SETTINGS_FIELDS, formData);
  if (!data) return state;

  const db = getDb();
  const values = data as { contactEmail: string; roles: string[]; rolesEn: string[] };
  const [current] = await db.select({ id: tables.siteSettings.id }).from(tables.siteSettings).limit(1);
  if (current) await db.update(tables.siteSettings).set(values).where(eq(tables.siteSettings.id, current.id));
  else await db.insert(tables.siteSettings).values(values);

  updateTag(PORTFOLIO_TAG);
  const list = (roles: string[]) => roles.join(", ");
  return { values: { contactEmail: values.contactEmail, roles: list(values.roles), rolesEn: list(values.rolesEn) }, saved: true };
}

export async function setMessageRead(id: number, isRead: boolean): Promise<void> {
  await requireAdmin();
  await getDb().update(tables.contactMessages).set({ isRead }).where(eq(tables.contactMessages.id, id));
  redirect(`/admin/messages/${id}`);
}

export async function deleteMessage(id: number): Promise<void> {
  await requireAdmin();
  await getDb().delete(tables.contactMessages).where(eq(tables.contactMessages.id, id));
  redirect("/admin/messages");
}

export async function logout(): Promise<void> {
  await deleteSession();
  redirect("/admin/login");
}
