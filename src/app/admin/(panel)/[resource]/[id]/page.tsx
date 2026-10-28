import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import ConfirmButton from "@/components/admin/ConfirmButton";
import ResourceForm, { type FormValues } from "@/components/admin/ResourceForm";
import { card } from "@/components/admin/styles";
import { getDb } from "@/db";
import { findResource } from "@/lib/admin/resources";
import { RESOURCE_TABLES } from "@/lib/admin/tables";
import { requireAdmin } from "@/lib/auth";
import { deleteItem, saveItem } from "../../actions";

// Depends on the admin session: rendered on each request (see the (panel) layout)
export const instant = false;

export default async function EditItem({ params }: PageProps<"/admin/[resource]/[id]">) {
  await requireAdmin();
  const { resource: key, id: rawId } = await params;
  const resource = findResource(key);
  const table = RESOURCE_TABLES[key];
  const id = Number(rawId);
  if (!resource || !table || !Number.isInteger(id)) notFound();

  const [row] = (await getDb().select().from(table).where(eq(table.id, id))) as Record<string, unknown>[];
  if (!row) notFound();

  // Form inputs take strings; tags are edited as a comma-separated list and "#" (no link) as an empty field
  const initial: FormValues = Object.fromEntries(
    resource.fields.map((f) => {
      const v = row[f.name];
      if (typeof v === "boolean") return [f.name, v];
      if (Array.isArray(v)) return [f.name, v.join(", ")];
      return [f.name, f.type === "url" && v === "#" ? "" : String(v ?? "")];
    }),
  );

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-[30px] font-bold tracking-tight text-text">Modifier : {resource.singular}</h1>
        <ConfirmButton action={deleteItem.bind(null, key, id)} message="Supprimer définitivement cet élément ?">
          Supprimer
        </ConfirmButton>
      </div>
      <div className={`${card} mt-8 p-6 sm:p-8`}>
        <ResourceForm fields={resource.fields} initial={initial} action={saveItem.bind(null, key, id)} cancelHref={`/admin/${key}`} />
      </div>
    </div>
  );
}
