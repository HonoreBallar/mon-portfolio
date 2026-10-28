import type { Metadata } from "next";
import Link from "next/link";
import { fontClasses } from "./fonts";
import "./globals.css";

export const metadata: Metadata = { title: "404 — Honoré Amounan", robots: { index: false } };

// Shown for any URL that matches no route (the site and the admin have separate root layouts)
export default function GlobalNotFound() {
  return (
    <html lang="fr" className={fontClasses}>
      <body>
        <main className="grid min-h-screen place-items-center px-4 text-center">
          <div>
            <p className="font-mono text-[14px] text-cyan">~/portfolio $ 404</p>
            <h1 className="mt-3 text-[32px] font-bold tracking-tight text-text">Page introuvable · Page not found</h1>
            <p className="mt-6 flex justify-center gap-6 font-mono text-[15px]">
              <Link href="/" className="text-cyan hover:underline">
                Accueil
              </Link>
              <Link href="/en" className="text-cyan hover:underline">
                Home
              </Link>
            </p>
          </div>
        </main>
      </body>
    </html>
  );
}
