import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const grotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const mono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Amounan Kouadjo Honoré — Développeur IA full-stack & DevOps",
  description:
    "Développeur IA full-stack & DevOps basé à Abidjan : systèmes RAG en production, intégration de LLM, applications web et mobiles, CI/CD et Docker.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" data-scroll-behavior="smooth" className={`${grotesk.variable} ${mono.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
