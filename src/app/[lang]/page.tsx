import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Expertise from "@/components/Expertise";
import Projects from "@/components/Projects";
import Pipeline from "@/components/Pipeline";
import Timeline from "@/components/Timeline";
import Contact from "@/components/Contact";
import RevealObserver from "@/components/RevealObserver";
import { Starfield } from "@/components/Starfield";
import { hasLocale, localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import type { Portfolio } from "@/lib/data";
import { getPortfolio } from "@/lib/portfolio";
import { SITE_URL } from "@/lib/site";

/** Structured data describing me, so search engines link this site to my name and profiles */
function personJsonLd(locale: Locale, content: Portfolio) {
  const t = getDictionary(locale);
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Honoré Amounan",
    alternateName: "Amounan Kouadjo Honoré",
    jobTitle: t.hero.role.split(" · ")[0],
    description: t.meta.description,
    url: new URL(localePath(locale), SITE_URL).href,
    image: new URL("/icon.png", SITE_URL).href,
    address: { "@type": "PostalAddress", addressLocality: "Abidjan", addressCountry: "CI" },
    knowsAbout: content.stack.map((s) => s.name),
    knowsLanguage: ["fr", "en"],
    sameAs: content.socials.map((s) => s.href).filter((href) => href.startsWith("http")),
  };
}

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const content = await getPortfolio(lang);
  const t = getDictionary(lang);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd(lang, content)).replace(/</g, "\\u003c") }}
      />
      <Starfield />
      <RevealObserver />
      <Header locale={lang} t={t} />
      <main className="relative z-10">
        <Hero t={t.hero} roles={content.roles} stats={content.stats} stack={content.stack} />
        <Expertise t={t.expertise} items={content.expertise} />
        <Projects t={t.projects} projects={content.projects} />
        <Pipeline t={t.pipeline} steps={content.pipeline} />
        <Timeline t={t.timeline} entries={content.timeline} />
        <Contact t={t.contact} email={content.contactEmail} socials={content.socials} />
      </main>
      <footer className="relative z-10 border-t border-white/[0.06]">
        <div className="container-x flex flex-col items-start justify-between gap-4 py-[38px] sm:flex-row sm:items-center">
          <p className="font-mono text-[13px] text-[#9aa1b5]">{t.footer.copyright}</p>
          <a href="#top" className="font-mono text-[13px] font-semibold text-cyan transition hover:text-[#67e8f9]">
            {t.footer.backToTop}
          </a>
        </div>
      </footer>
    </>
  );
}
