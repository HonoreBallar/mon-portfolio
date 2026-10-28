"use client";

import { useEffect, useRef, useState } from "react";

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

export default function Terminal({ deployed }: { deployed: string }) {
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
