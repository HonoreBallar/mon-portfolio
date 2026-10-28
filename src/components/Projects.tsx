import type { Dictionary } from "@/i18n/dictionaries";
import { CATEGORIES, type Category, type Portfolio } from "@/lib/data";
import ProjectFilters, { ALL } from "./ProjectFilters";
import { Reveal, SectionHeading, Tag } from "./ui";

const hasLink = (href: string) => href !== "" && href !== "#";
const GRID_ID = "projects-grid";

export default function Projects({ t, projects }: { t: Dictionary["projects"]; projects: Portfolio["projects"] }) {
  const label = (c: Category) => t.categories[c] ?? c;
  // Only offer filters for categories that have at least one project
  const filters = [
    { value: ALL, label: t.all },
    ...CATEGORIES.filter((c) => projects.some((p) => p.category === c)).map((c) => ({ value: c, label: label(c) })),
  ];

  return (
    <section id="projets" className="relative scroll-mt-20 pt-[160px]">
      <div className="container-x">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading kicker={t.kicker}>
            {t.title[0]}
            <br className="hidden sm:block" /> {t.title[1]}
          </SectionHeading>

          <Reveal className="flex flex-wrap gap-2" delay={100}>
            <ProjectFilters gridId={GRID_ID} filters={filters} />
          </Reveal>
        </div>

        <div id={GRID_ID} className="mt-[48px] grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={(i % 3) * 120} data-category={p.category}>
              <article className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-white/[0.08] bg-[#090b15] transition duration-500 hover:-translate-y-1.5 hover:border-white/15">
                <div className="grid-bg relative h-[230px] overflow-hidden border-b border-white/[0.06] bg-[#0b0e1c]">
                  <div
                    aria-hidden
                    className="absolute left-1/2 top-[38%] h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full transition duration-700 group-hover:scale-125"
                    style={{
                      background: `radial-gradient(circle, rgba(${p.glow},0.55), rgba(${p.glow},0.12) 45%, transparent 70%)`,
                    }}
                  />
                  <span className="absolute left-[18px] top-[11px] rounded-full border border-white/10 bg-[#070910]/90 px-3 py-[5px] font-mono text-[12px] font-semibold text-text">
                    {label(p.category)}
                  </span>
                  <span className="absolute left-1/2 top-[88px] -translate-x-1/2 whitespace-nowrap rounded-md border border-white/15 bg-black/20 px-4 py-2 font-mono text-[15px] text-[#c9cede]">
                    {p.tags[0]}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-7">
                  <h3 className="text-[25.5px] font-bold leading-[1.22] tracking-tight text-text">{p.title}</h3>
                  <p className="mt-3 text-[16px] leading-[1.55] text-muted">{p.description}</p>
                  <div className="mt-3.5 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </div>
                  {(hasLink(p.demo) || hasLink(p.source)) && (
                    <div className="mt-auto flex items-center gap-[22px] pb-4 pt-8">
                      {hasLink(p.demo) && (
                        <a href={p.demo} className="group/link inline-flex items-center gap-2 text-[16px] font-semibold text-cyan">
                          {t.demo}
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" className="transition group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5">
                            <path d="M7 17L17 7M9 7h8v8" />
                          </svg>
                        </a>
                      )}
                      {hasLink(p.source) && (
                        <a href={p.source} className="text-[16px] text-[#c3c8d6] transition hover:text-text">
                          {t.source}
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
