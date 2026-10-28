import type { ElementType, HTMLAttributes, ReactNode } from "react";

/**
 * Block that fades in when it scrolls into view. Rendered on the server: a single
 * observer (RevealObserver) adds "is-visible", instead of one client component per block.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
  ...rest
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
} & Omit<HTMLAttributes<HTMLElement>, "children" | "className" | "style">) {
  return (
    <Tag {...rest} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
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
