import type { ReactNode } from "react";
import { fontClasses } from "../fonts";
import "../globals.css";

// Root layout of the admin (the public site has its own in app/[lang])
export default function AdminRootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" className={fontClasses}>
      <body>{children}</body>
    </html>
  );
}
