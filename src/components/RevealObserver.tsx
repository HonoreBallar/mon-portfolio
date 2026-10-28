"use client";

import { useEffect } from "react";

/** Shows every ".reveal" block when it scrolls into view (see Reveal in ui.tsx) */
export default function RevealObserver() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    document.querySelectorAll(".reveal:not(.is-visible)").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
