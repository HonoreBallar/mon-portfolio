import type { Dictionary } from "@/i18n/dictionaries";
import type { Portfolio } from "@/lib/data";
import { Reveal, SectionHeading, Tag } from "./ui";

const ICONS = {
  code: <path d="M9 7l-5 5 5 5M15 7l5 5-5 5" />,
  chip: (
    <>
      <rect x="7" y="7" width="10" height="10" rx="2" />
      <rect x="10" y="10" width="4" height="4" rx="0.5" />
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
    </>
  ),
  cloud: <path d="M7 18h10a4 4 0 0 0 .6-7.95A6 6 0 0 0 6.2 9.6 4.2 4.2 0 0 0 7 18z" />,
};

export default function Expertise({ t, items }: { t: Dictionary["expertise"]; items: Portfolio["expertise"] }) {
  return (
    <section id="expertise" className="relative scroll-mt-20 pt-[140px]">
      <div className="container-x">
        <SectionHeading kicker={t.kicker}>
          {t.title[0]}
          <br className="hidden sm:block" /> {t.title[1]}
        </SectionHeading>

        <div className="mt-[60px] grid gap-6 md:grid-cols-3">
          {items.map((e, i) => (
            <Reveal key={e.title} delay={i * 120}>
              <article
                className="group relative flex h-full flex-col overflow-hidden rounded-[22px] border border-white/[0.07] bg-gradient-to-b from-[#0e101a] to-[#0a0c14] p-[34px] transition duration-500 hover:-translate-y-1.5"
                style={{ ["--c" as string]: e.color }}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -top-24 left-0 h-48 w-48 rounded-full opacity-0 blur-3xl transition duration-500 group-hover:opacity-30"
                  style={{ background: e.color }}
                />
                <div
                  className="grid h-14 w-14 place-items-center rounded-xl border"
                  style={{
                    color: e.color,
                    borderColor: `color-mix(in srgb, ${e.color} 30%, transparent)`,
                    background: `color-mix(in srgb, ${e.color} 10%, transparent)`,
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    {ICONS[e.icon]}
                  </svg>
                </div>
                <h3 className="mt-7 text-[24px] font-bold tracking-tight text-text">{e.title}</h3>
                <p className="mt-4 text-[16px] leading-[1.7] text-muted">{e.text}</p>
                <div className="mt-auto flex flex-wrap gap-2 pt-9">
                  {e.tags.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-[22px] border opacity-0 transition duration-500 group-hover:opacity-100"
                  style={{ borderColor: `color-mix(in srgb, ${e.color} 35%, transparent)` }}
                />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
