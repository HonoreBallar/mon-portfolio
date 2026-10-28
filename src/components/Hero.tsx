"use client";

import { useEffect, useState } from "react";
import type { Portfolio } from "@/lib/data";

function Typewriter({ roles }: { roles: Portfolio["roles"] }) {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (roles.length === 0) return;
    const word = roles[index % roles.length];
    let delay = deleting ? 35 : 75;
    if (!deleting && text === word) delay = 2200;
    if (deleting && text === "") delay = 300;

    const t = setTimeout(() => {
      if (!deleting && text === word) setDeleting(true);
      else if (deleting && text === "") {
        setDeleting(false);
        setIndex((i) => i + 1);
      } else setText(word.slice(0, text.length + (deleting ? -1 : 1)));
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, index, roles]);

  return (
    <p className="font-mono text-[18px] text-text sm:text-[24px]">
      <span className="text-cyan">~/portfolio $</span> {text}
      <span className="caret ml-1" />
    </p>
  );
}

const LABELS = [
  { name: "Python", left: 91, top: 80, delay: "0s" },
  { name: "LLM / RAG", left: 391, top: 111, delay: "1.2s" },
  { name: "Spring Boot", left: 38, top: 375, delay: "2.1s" },
  { name: "Docker", left: 335, top: 405, delay: "0.6s" },
];

function Orb() {
  return (
    <div className="relative h-[520px] w-[520px]">
      {/* Vertical ring */}
      <div
        className="absolute left-1/2 top-1/2 h-[340px] w-[136px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-cyan/25"
        style={{ animation: "float 7s ease-in-out infinite" }}
      />

      {/* Sphere */}
      <div className="absolute left-1/2 top-1/2 h-[205px] w-[205px] -translate-x-1/2 -translate-y-1/2">
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(circle at 30% 28%, #f2d6dc 0%, #8fc7cf 9%, #3f9fb3 30%, #3d7799 52%, #4c5a8e 72%, #5a4a86 100%)",
            boxShadow:
              "0 0 60px rgba(34,211,238,0.35), 0 0 140px rgba(34,211,238,0.18), inset -18px -24px 50px rgba(20,10,50,0.55)",
          }}
        />
      </div>

      {/* Horizontal ring (front) */}
      <div
        className="absolute left-1/2 top-1/2 h-[120px] w-[390px] rounded-[50%] border-[1.5px] border-cyan/80"
        style={{
          boxShadow: "0 0 18px rgba(34,211,238,0.45), inset 0 0 18px rgba(34,211,238,0.3)",
          transform: "translate(-50%, -50%) rotate(-2deg)",
        }}
      >
        <span
          className="absolute h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_10px_#22d3ee]"
          style={{ offsetPath: "ellipse(50% 50% at 50% 50%)", animation: "orbit 8s linear infinite" } as React.CSSProperties}
        />
      </div>

      {LABELS.map((l) => (
        <span
          key={l.name}
          className="float absolute rounded-lg border border-white/10 bg-[#0c0f1c]/90 px-3.5 py-2 font-mono text-[13px] font-semibold text-text shadow-[0_8px_30px_rgba(0,0,0,0.4)] backdrop-blur"
          style={{ left: l.left, top: l.top, animationDelay: l.delay }}
        >
          {l.name}
        </span>
      ))}
    </div>
  );
}

function Marquee({ stack }: { stack: Portfolio["stack"] }) {
  const items = [...stack, ...stack];
  return (
    <div className="relative">
      {/* Perspective grid floor */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-full h-[140px] overflow-hidden [perspective:320px]">
        <div
          className="absolute inset-x-[-50%] bottom-0 h-[400px] origin-bottom"
          style={{
            transform: "rotateX(72deg)",
            backgroundImage:
              "linear-gradient(90deg, rgba(34,211,238,0.22) 1px, transparent 1px), linear-gradient(rgba(34,211,238,0.12) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            maskImage: "linear-gradient(to top, black 10%, transparent 85%)",
            WebkitMaskImage: "linear-gradient(to top, black 10%, transparent 85%)",
          }}
        />
      </div>

      <div className="relative overflow-hidden border-y border-white/[0.06] bg-[#080a12]/80 py-[22px] [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]">
        <div className="marquee flex w-max gap-4">
          {items.map((t, i) => (
            <span
              key={i}
              className="flex items-center gap-2.5 whitespace-nowrap rounded-full border border-white/10 bg-[#0c0f1a] px-4 py-[9px] font-mono text-[14px] text-[#d5d9e4]"
            >
              <span className="h-[7px] w-[7px] rounded-full" style={{ background: t.color, boxShadow: `0 0 8px ${t.color}` }} />
              {t.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Hero({
  roles,
  stats,
  stack,
}: Pick<Portfolio, "roles" | "stats" | "stack">) {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* Teal glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-[74px] h-[900px] w-[45%]"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 60% 18%, rgba(13,148,160,0.42), rgba(8,120,140,0.16) 45%, transparent 75%)",
        }}
      />

      <div className="container-x relative pb-[140px] pt-[146px] lg:pb-[120px]">
        <div className="relative z-10 max-w-[780px]">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-[14px] py-[7px] font-mono text-[13px] text-[#c3c8d6]">
            <span className="pulse-dot h-2 w-2 rounded-full bg-green" />
            Disponible pour de nouveaux projets — Abidjan / Remote
          </div>

          <p className="mt-7 font-mono text-[15px] text-cyan">~/portfolio $ whoami</p>
          <h1 className="mt-3 font-bold tracking-[-0.035em] text-text">
            <span className="block text-[40px] leading-[1.05] sm:text-[56px] lg:text-[72px]">
              Honoré Amounan<span className="text-cyan">.</span>
            </span>
            <span className="sr-only"> — </span>
            <span className="mt-3 block font-mono text-[16px] font-medium tracking-normal text-muted sm:text-[19px]">
              Développeur IA full-stack &amp; DevOps · Abidjan
            </span>
          </h1>

          <p className="mt-8 max-w-[720px] text-[28px] font-bold leading-[1.15] tracking-[-0.025em] text-text sm:text-[34px] lg:text-[40px]">
            Je construis des produits <span className="shimmer-text">intelligents</span>, du code à la production.
          </p>

          <div className="mt-6">
            <Typewriter roles={roles} />
          </div>

          <p className="mt-7 max-w-[580px] text-[17px] leading-[1.7] text-muted sm:text-[18px]">
            Plus de 3 ans d’expérience à concevoir des solutions qui exploitent les modèles de langage — dont un
            système RAG en production — pour faciliter l’accès à l’information, automatiser les tâches et améliorer les
            processus métier.
          </p>

          <div className="mt-8 flex flex-wrap gap-3.5">
            <a
              href="#projets"
              className="group inline-flex h-[53px] items-center gap-3 rounded-[10px] bg-cyan px-[25px] text-[16px] font-semibold text-[#04121a] shadow-[0_0_28px_rgba(34,211,238,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(34,211,238,0.55)]"
            >
              Voir mes projets
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="transition group-hover:translate-x-1">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <a
              href="#contact"
              className="inline-flex h-[53px] items-center gap-3 rounded-[10px] border border-white/15 bg-white/[0.02] px-[27px] text-[16px] font-semibold text-text transition hover:-translate-y-0.5 hover:border-cyan/50 hover:bg-cyan/5"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 7l9 6 9-6" />
              </svg>
              Me contacter
            </a>
          </div>

          <dl className="mt-11 flex gap-9">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="text-[34px] font-bold leading-none tracking-tight text-text">{s.value}</dt>
                <dd className="mt-2 font-mono text-[13px] text-dim">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="absolute right-[-45px] top-[285px] hidden lg:block">
          <Orb />
        </div>
      </div>

      <Marquee stack={stack} />
    </section>
  );
}
