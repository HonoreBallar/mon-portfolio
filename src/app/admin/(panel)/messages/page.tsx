import { desc } from "drizzle-orm";
import Link from "next/link";
import { card } from "@/components/admin/styles";
import { getDb, tables } from "@/db";
import { requireAdmin } from "@/lib/auth";

// Depends on the admin session: rendered on each request (see the (panel) layout)
export const instant = false;

const dateFormat = new Intl.DateTimeFormat("fr-FR", { dateStyle: "medium", timeStyle: "short", timeZone: "Africa/Abidjan" });

export default async function Messages() {
  await requireAdmin();
  const messages = await getDb().select().from(tables.contactMessages).orderBy(desc(tables.contactMessages.createdAt));

  return (
    <div className="max-w-[1000px]">
      <h1 className="text-[30px] font-bold tracking-tight text-text">Messages</h1>
      <div className={`${card} mt-8 divide-y divide-white/[0.06]`}>
        {messages.length === 0 && <p className="p-5 text-[15px] text-muted">Aucun message pour l’instant.</p>}
        {messages.map((m) => (
          <Link
            key={m.id}
            href={`/admin/messages/${m.id}`}
            className="flex flex-col gap-1 p-4 transition hover:bg-white/[0.02] sm:flex-row sm:items-center sm:gap-4"
          >
            <span className="flex shrink-0 items-center gap-2 sm:w-[220px]">
              <span className={`h-2 w-2 rounded-full ${m.isRead ? "bg-transparent" : "bg-cyan"}`} />
              <span className={m.isRead ? "text-[#c3c8d6]" : "font-semibold text-text"}>{m.name}</span>
            </span>
            <span className="min-w-0 flex-1 truncate text-[14px] text-muted">{m.message}</span>
            <span className="shrink-0 font-mono text-[12px] text-dim">{dateFormat.format(m.createdAt)}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
