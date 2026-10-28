import type { Dictionary } from "@/i18n/dictionaries";
import type { Portfolio } from "@/lib/data";
import Terminal from "./Terminal";
import { Reveal, SectionHeading } from "./ui";

export default function Pipeline({ t, steps }: { t: Dictionary["pipeline"]; steps: Portfolio["pipeline"] }) {
  return (
    <section id="devops" className="relative scroll-mt-20 pt-[170px]">
      <div className="container-x">
        <SectionHeading kicker={t.kicker}>
          {t.title[0]}
          <br className="hidden sm:block" /> {t.title[1]}
        </SectionHeading>

        <Reveal className="mt-12">
          <div className="rounded-[22px] border border-white/[0.07] bg-[#080a14] px-6 pb-11 pt-11 md:px-10">
            <div className="relative grid grid-cols-2 gap-y-10 sm:grid-cols-3 md:grid-cols-5">
              {/* Connector track */}
              <div aria-hidden className="absolute left-[10%] right-[10%] top-[38px] hidden h-px bg-white/10 md:block">
                <span className="absolute inset-0 [animation:travel_5s_ease-in-out_infinite]">
                  <span className="absolute left-0 top-1/2 h-[10px] w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan shadow-[0_0_14px_#22d3ee]" />
                </span>
              </div>

              {steps.map((s, i) => (
                <div key={s.n} className="relative flex flex-col items-center px-2 text-center">
                  <div
                    className="relative grid h-[76px] w-[76px] place-items-center rounded-[16px] border border-white/10 bg-[#121628] font-mono text-[22px] font-semibold"
                    style={{
                      color: s.color,
                      boxShadow: `0 0 26px color-mix(in srgb, ${s.color} 45%, transparent)`,
                      animation: `stepPulse 5s ease-in-out ${i * 1}s infinite`,
                    }}
                  >
                    {s.n}
                  </div>
                  <h3 className="mt-5 text-[19px] font-bold text-text">{s.title}</h3>
                  <p className="mt-2.5 max-w-[200px] text-[14.5px] leading-[1.45] text-muted">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal>
          <Terminal deployed={t.deployed} />
        </Reveal>
      </div>
    </section>
  );
}
