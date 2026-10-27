import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Expertise from "@/components/Expertise";
import Projects from "@/components/Projects";
import Pipeline from "@/components/Pipeline";
import Timeline from "@/components/Timeline";
import Contact from "@/components/Contact";
import { Starfield } from "@/components/ui";
import { getPortfolio } from "@/lib/portfolio";

export default async function Home() {
  const content = await getPortfolio();

  return (
    <>
      <Starfield />
      <Header />
      <main className="relative z-10">
        <Hero roles={content.roles} stats={content.stats} stack={content.stack} />
        <Expertise items={content.expertise} />
        <Projects projects={content.projects} />
        <Pipeline steps={content.pipeline} />
        <Timeline entries={content.timeline} />
        <Contact email={content.contactEmail} socials={content.socials} />
      </main>
      <footer className="relative z-10 border-t border-white/[0.06]">
        <div className="container-x flex flex-col items-start justify-between gap-4 py-[38px] sm:flex-row sm:items-center">
          <p className="font-mono text-[13px] text-[#9aa1b5]">© 2026 Amounan Kouadjo Honoré — Développeur IA full-stack &amp; DevOps</p>
          <a href="#top" className="font-mono text-[13px] font-semibold text-cyan transition hover:text-[#67e8f9]">
            Retour en haut ↑
          </a>
        </div>
      </footer>
    </>
  );
}
