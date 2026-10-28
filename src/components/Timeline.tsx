import type { Dictionary } from "@/i18n/dictionaries";
import type { Portfolio } from "@/lib/data";
import { Reveal, SectionHeading } from "./ui";

export default function Timeline({ t, entries }: { t: Dictionary["timeline"]; entries: Portfolio["timeline"] }) {
  return (
    <section id="parcours" className="relative scroll-mt-20 pt-[175px]">
      <div className="container-x">
        <div className="mx-auto max-w-[980px]">
          <SectionHeading kicker={t.kicker}>{t.title}</SectionHeading>

          <div className="relative mt-12 pl-8 sm:pl-[38px]">
            <div
              aria-hidden
              className="absolute bottom-0 left-[6px] top-0 w-[2px] rounded-full"
              style={{ background: "linear-gradient(to bottom, #22d3ee, #8b5cf6 60%, transparent)" }}
            />
            <ol className="space-y-7">
              {entries.map((t, i) => (
                <Reveal as="li" key={i} delay={i * 120} className="relative">
                  <span
                    aria-hidden
                    className="absolute -left-8 top-[34px] h-[18px] w-[18px] rounded-full border-2 border-cyan bg-[#05060b] shadow-[0_0_12px_rgba(34,211,238,0.7)] sm:-left-[39px]"
                  />
                  <div className="rounded-[18px] border border-white/[0.07] bg-[#0b0d16] px-7 py-[26px] transition duration-300 hover:border-cyan/30 hover:bg-[#0d1019]">
                    <p className="font-mono text-[13px] text-cyan">{t.period}</p>
                    <h3 className="mt-2 text-[22px] font-bold tracking-tight text-text">{t.title}</h3>
                    <p className="mt-2 text-[16px] text-muted">{t.text}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
