import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { RESOURCES } from "@/lib/admin/resources";
import { logout } from "./actions";

export const metadata: Metadata = { title: "Admin — Portfolio", robots: { index: false } };

// Every admin page depends on the session, so none of them can be prerendered.
// Each page repeats it: this only covers navigations coming from outside /admin.
export const instant = false;

const NAV = [
  { href: "/admin", label: "Tableau de bord" },
  { href: "/admin/messages", label: "Messages" },
  ...RESOURCES.map((r) => ({ href: `/admin/${r.key}`, label: r.label })),
  { href: "/admin/settings", label: "Réglages" },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen md:flex">
      <aside className="border-b border-white/[0.06] bg-[#080a12] md:sticky md:top-0 md:h-screen md:w-[240px] md:shrink-0 md:border-b-0 md:border-r">
        <div className="flex items-center justify-between px-5 py-5">
          <Link href="/admin" className="font-mono text-[15px] font-bold text-text">
            <span className="text-cyan">&lt;/&gt;</span> admin
          </Link>
          <Link href="/" className="font-mono text-[12px] text-dim hover:text-cyan">
            voir le site ↗
          </Link>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-3 pb-3 md:flex-col md:overflow-visible">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap rounded-lg px-3 py-2 text-[14px] text-[#c3c8d6] transition hover:bg-white/5 hover:text-cyan"
            >
              {item.label}
            </Link>
          ))}
          <form action={logout} className="md:mt-4">
            <button
              type="submit"
              className="whitespace-nowrap rounded-lg px-3 py-2 text-left text-[14px] text-dim transition hover:text-[#f87171]"
            >
              Déconnexion
            </button>
          </form>
        </nav>
      </aside>
      <main className="min-w-0 flex-1 px-4 py-8 sm:px-8 md:py-10">{children}</main>
    </div>
  );
}
