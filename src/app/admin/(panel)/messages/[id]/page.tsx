import { eq } from "drizzle-orm";
import Link from "next/link";
import { notFound } from "next/navigation";
import ConfirmButton from "@/components/admin/ConfirmButton";
import { card, primaryButton, secondaryButton } from "@/components/admin/styles";
import { getDb, tables } from "@/db";
import { requireAdmin } from "@/lib/auth";
import { deleteMessage, setMessageRead } from "../../actions";

// Depends on the admin session: rendered on each request (see the (panel) layout)
export const instant = false;

const dateFormat = new Intl.DateTimeFormat("fr-FR", { dateStyle: "full", timeStyle: "short", timeZone: "Africa/Abidjan" });

export default async function MessageDetail({ params }: PageProps<"/admin/messages/[id]">) {
  await requireAdmin();
  const id = Number((await params).id);
  if (!Number.isInteger(id)) notFound();

  const [m] = await getDb().select().from(tables.contactMessages).where(eq(tables.contactMessages.id, id));
  if (!m) notFound();

  return (
    <div className="w-full">
      <Link href="/admin/messages" className="font-mono text-[13px] text-dim hover:text-cyan">
        ← Messages
      </Link>
      <div className={`${card} mt-4 p-6 sm:p-8`}>
        <h1 className="text-[24px] font-bold tracking-tight text-text">{m.name}</h1>
        <p className="mt-1 text-[15px] text-cyan">{m.email}</p>
        <p className="mt-1 font-mono text-[12px] text-dim">{dateFormat.format(m.createdAt)}</p>
        <p className="mt-6 whitespace-pre-wrap text-[16px] leading-[1.7] text-[#d5d9e4]">{m.message}</p>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <a href={`mailto:${m.email}?subject=${encodeURIComponent("Re: votre message")}`} className={primaryButton}>
          Répondre
        </a>
        <form action={setMessageRead.bind(null, m.id, !m.isRead)}>
          <button type="submit" className={secondaryButton}>
            {m.isRead ? "Marquer comme non lu" : "Marquer comme lu"}
          </button>
        </form>
        <ConfirmButton action={deleteMessage.bind(null, m.id)} message="Supprimer définitivement ce message ?">
          Supprimer
        </ConfirmButton>
      </div>
    </div>
  );
}
