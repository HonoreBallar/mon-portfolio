import { asc } from "drizzle-orm";
import Link from "next/link";
import { notFound } from "next/navigation";
import { card, primaryButton } from "@/components/admin/styles";
import { getDb } from "@/db";
import { findResource } from "@/lib/admin/resources";
import { RESOURCE_TABLES } from "@/lib/admin/tables";
import { requireAdmin } from "@/lib/auth";

// Depends on the admin session: rendered on each request (see the (panel) layout)
export const instant = false;

function display(value: unknown): string {
  if (typeof value === "boolean") return value ? "Oui" : "Non";
  if (Array.isArray(value)) return value.join(", ");
  return String(value ?? "");
}

export default async function ResourceList({ params }: PageProps<"/admin/[resource]">) {
  await requireAdmin();
  const { resource: key } = await params;
  const resource = findResource(key);
  const table = RESOURCE_TABLES[key];
  if (!resource || !table) notFound();

  const rows = (await getDb().select().from(table).orderBy(asc(table.position), asc(table.id))) as Record<string, unknown>[];
  const labels = Object.fromEntries(resource.fields.map((f) => [f.name, f.label]));

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-[30px] font-bold tracking-tight text-text">{resource.label}</h1>
        <Link href={`/admin/${key}/new`} className={primaryButton}>
          + Ajouter
        </Link>
      </div>

      <div className={`${card} mt-8 overflow-x-auto`}>
        <table className="w-full text-left text-[15px]">
          <thead className="border-b border-white/[0.06] font-mono text-[12px] uppercase tracking-wide text-dim">
            <tr>
              <th className="px-5 py-3 font-medium">Pos.</th>
              {resource.columns.map((c) => (
                <th key={c} className="px-5 py-3 font-medium">
                  {labels[c]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.06]">
            {rows.length === 0 && (
              <tr>
                <td colSpan={resource.columns.length + 1} className="px-5 py-6 text-muted">
                  Aucun élément.
                </td>
              </tr>
            )}
            {rows.map((row) => (
              <tr key={String(row.id)} className="transition hover:bg-white/[0.02]">
                <td className="px-5 py-3 font-mono text-[13px] text-dim">{String(row.position)}</td>
                {resource.columns.map((c, i) => (
                  <td key={c} className="max-w-[420px] truncate px-5 py-3 text-[#d5d9e4]">
                    {i === 0 ? (
                      <Link href={`/admin/${key}/${row.id}`} className="font-medium text-text hover:text-cyan">
                        {display(row[c])}
                      </Link>
                    ) : c === "color" ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="h-3 w-3 rounded-full" style={{ background: String(row[c]) }} />
                        {display(row[c])}
                      </span>
                    ) : (
                      display(row[c])
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
