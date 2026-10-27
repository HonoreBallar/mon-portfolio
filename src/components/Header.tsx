"use client";

import { useEffect, useState } from "react";
import { NAV } from "@/lib/data";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? "border-white/[0.06] bg-[#05060b]/80 backdrop-blur-xl"
          : "border-white/[0.04] bg-[#05060b]/40 backdrop-blur-md"
      }`}
    >
      <div className="container-x flex h-[74px] items-center justify-between">
        <a href="#top" className="group flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-[10px] border border-cyan/50 bg-cyan/10 font-mono text-[13px] font-bold text-cyan shadow-[0_0_18px_rgba(34,211,238,0.35)] transition group-hover:shadow-[0_0_26px_rgba(34,211,238,0.6)]">
            &lt;/&gt;
          </span>
          <span className="font-mono text-[17px] font-bold tracking-tight text-text">Honoré Amounan</span>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[15px] text-[#c3c8d6] transition-colors hover:text-cyan"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className="ml-1 rounded-full bg-cyan px-[18px] py-2 text-[15px] font-semibold text-[#04121a] shadow-[0_0_24px_rgba(34,211,238,0.35)] transition hover:-translate-y-px hover:shadow-[0_0_32px_rgba(34,211,238,0.6)]"
          >
            Me contacter
          </a>
        </nav>

        <button
          aria-label="Menu"
          onClick={() => setOpen((o) => !o)}
          className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 md:hidden"
        >
          <span className="relative block h-3 w-5">
            <span className={`absolute left-0 h-0.5 w-5 bg-text transition ${open ? "top-1.5 rotate-45" : "top-0"}`} />
            <span className={`absolute left-0 h-0.5 w-5 bg-text transition ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
          </span>
        </button>
      </div>

      {open && (
        <nav className="container-x flex flex-col gap-1 pb-5 md:hidden">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-2.5 text-[15px] text-[#c3c8d6] hover:bg-white/5"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-cyan px-4 py-2.5 text-center font-semibold text-[#04121a]"
          >
            Me contacter
          </a>
        </nav>
      )}
    </header>
  );
}
