import { count, desc, eq } from "drizzle-orm";
import Link from "next/link";
import { card } from "@/components/admin/styles";
import { getDb, tables } from "@/db";
import { RESOURCES } from "@/lib/admin/resources";
import { RESOURCE_TABLES } from "@/lib/admin/tables";
import { requireAdmin } from "@/lib/auth";

// Depends on the admin session: rendered on each request (see the (panel) layout)
export const instant = false;

export default async function Dashboard() {
  const admin = await requireAdmin();
  const db = getDb();

  const [counts, [{ unread }], latest] = await Promise.all([
    Promise.all(RESOURCES.map(async (r) => (await db.select({ n: count() }).from(RESOURCE_TABLES[r.key]))[0].n)),
    db.select({ unread: count() }).from(tables.contactMessages).where(eq(tables.contactMessages.isRead, false)),
    db.select().from(tables.contactMessages).orderBy(desc(tables.contactMessages.createdAt)).limit(5),
  ]);

  return (
    <div className="max-w-[1000px]">
      <h1 className="text-[30px] font-bold tracking-tight text-text">Tableau de bord</h1>
      <p className="mt-1 text-[15px] text-muted">Connecté en tant que {admin.email}</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Link href="/admin/messages" className={`${card} p-5 transition hover:border-cyan/40`}>
          <p className="text-[32px] font-bold text-cyan">{unread}</p>
          <p className="mt-1 text-[14px] text-muted">
            {unread > 1 ? "messages non lus" : "message non lu"}
          </p>
        </Link>
        {RESOURCES.map((r, i) => (
          <Link key={r.key} href={`/admin/${r.key}`} className={`${card} p-5 transition hover:border-cyan/40`}>
            <p className="text-[32px] font-bold text-text">{counts[i]}</p>
            <p className="mt-1 text-[14px] text-muted">{r.label}</p>
          </Link>
        ))}
      </div>

      <h2 className="mt-12 text-[20px] font-bold text-text">Derniers messages</h2>
      <div className={`${card} mt-4 divide-y divide-white/[0.06]`}>
        {latest.length === 0 && <p className="p-5 text-[15px] text-muted">Aucun message pour l’instant.</p>}
        {latest.map((m) => (
          <Link key={m.id} href={`/admin/messages/${m.id}`} className="flex items-center gap-3 p-4 transition hover:bg-white/[0.02]">
            {!m.isRead && <span className="h-2 w-2 shrink-0 rounded-full bg-cyan" />}
            <span className="shrink-0 font-medium text-text">{m.name}</span>
            <span className="truncate text-[14px] text-muted">{m.message}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
