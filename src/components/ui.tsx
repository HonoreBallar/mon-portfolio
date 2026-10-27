"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

export function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

export function SectionHeading({
  kicker,
  children,
  className = "",
}: {
  kicker: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Reveal className={className}>
      <p className="font-mono text-[14px] text-cyan">{kicker}</p>
      <h2 className="mt-4 max-w-[720px] text-[40px] font-bold leading-[1.08] tracking-[-0.02em] text-text md:text-[52px]">
        {children}
      </h2>
    </Reveal>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md bg-white/[0.06] px-2.5 py-1 font-mono text-[12px] text-[#c9cede]">
      {children}
    </span>
  );
}

type Star = { x: number; y: number; s: number; d: number; c: string };

export function Starfield() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const colors = ["#ffffff", "#22d3ee", "#a78bfa", "#ffffff"];
    // Generated on the client only to avoid hydration mismatches.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStars(
      Array.from({ length: 70 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        s: Math.random() < 0.85 ? 1.5 : 2.5,
        d: Math.random() * 6,
        c: colors[Math.floor(Math.random() * colors.length)],
      })),
    );
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      {stars.map((st, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${st.x}%`,
            top: `${st.y}%`,
            width: st.s,
            height: st.s,
            background: st.c,
            animation: `twinkle ${3 + st.d}s ease-in-out ${st.d}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
