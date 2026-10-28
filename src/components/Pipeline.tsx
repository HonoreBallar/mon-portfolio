"use client";

import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Portfolio } from "@/lib/data";
import { Reveal, SectionHeading } from "./ui";

const A = () => <span className="font-sans">→ </span>;

const LINES: { text: React.ReactNode; className: string }[] = [
  { text: "$ git push origin main", className: "font-bold text-text" },
  {
    text: (
      <>
        <A />CI&nbsp;&nbsp;lint ✓&nbsp;&nbsp;&nbsp;tests ✓&nbsp;&nbsp;&nbsp;build ✓
      </>
    ),
    className: "text-green",
  },
  { text: <><A />docker build -t app:$GITHUB_SHA .</>, className: "text-[#9aa1b5]" },
  { text: <><A />docker compose up -d</>, className: "text-[#9aa1b5]" },
  { text: <><A />nginx -s reload</>, className: "text-[#9aa1b5]" },
];

const DEPLOYED_CLASS = "font-medium text-cyan";
// The last line ("deployed") is localized, so it is added in Terminal
const TOTAL_LINES = LINES.length + 1;

function Terminal({ deployed }: { deployed: string }) {
  const lines = [...LINES, { text: deployed, className: DEPLOYED_CLASS }];
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let timer: ReturnType<typeof setInterval> | undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        timer = setInterval(() => {
          setShown((n) => {
            if (n >= TOTAL_LINES) {
              clearInterval(timer);
              return n;
            }
            return n + 1;
          });
        }, 550);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (timer) clearInterval(timer);
    };
  }, []);

  return (
    <div ref={ref} className="relative mt-12">
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 left-1/2 h-48 w-[90%] -translate-x-1/2 rounded-full bg-cyan/20 blur-[80px]"
      />
      <div className="relative overflow-hidden rounded-[18px] border border-white/[0.08] bg-[#070912]">
        <div className="flex h-[46px] items-center gap-2 border-b border-white/[0.06] bg-[#0c1024] px-[18px]">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <span className="ml-4 font-mono text-[13px] text-dim">deploy.sh — zsh</span>
        </div>
        <div className="min-h-[250px] px-[26px] py-[20px] font-mono text-[14px] leading-[30.5px] sm:text-[15px]">
          {lines.slice(0, shown).map((l, i) => (
            <div key={i} className={`${l.className} animate-[fadeIn_.4s_ease]`}>
              {l.text}
            </div>
          ))}
          <div className="text-text">
            $ <span className="caret" />
          </div>
        </div>
      </div>
    </div>
  );
}

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
                <span className="absolute top-1/2 h-[10px] w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan shadow-[0_0_14px_#22d3ee] [animation:travel_5s_ease-in-out_infinite]" />
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
