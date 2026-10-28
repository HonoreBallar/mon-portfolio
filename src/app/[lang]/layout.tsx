import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, localePath, LOCALES } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { SITE_URL } from "@/lib/site";
import { fontClasses } from "../fonts";
import "../globals.css";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang).meta;

  return {
    metadataBase: new URL(SITE_URL),
    title: t.title,
    description: t.description,
    alternates: {
      canonical: localePath(lang),
      languages: { fr: localePath("fr"), en: localePath("en"), "x-default": localePath("fr") },
    },
    openGraph: {
      type: "profile",
      siteName: "Honoré Amounan",
      title: t.title,
      description: t.description,
      url: localePath(lang),
      locale: lang === "fr" ? "fr_FR" : "en_US",
      alternateLocale: lang === "fr" ? "en_US" : "fr_FR",
    },
    twitter: { card: "summary_large_image", title: t.title, description: t.description },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <html lang={lang} data-scroll-behavior="smooth" className={fontClasses}>
      <body>
        {/* Without JavaScript, the fade-in blocks stay visible */}
        <noscript>
          <style>{".reveal{opacity:1;transform:none}"}</style>
        </noscript>
        {children}
        {/* The analytics script only exists on Vercel */}
        {process.env.VERCEL && <Analytics />}
      </body>
    </html>
  );
}
