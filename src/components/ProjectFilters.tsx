"use client";

import { useState } from "react";

export const ALL = "all";

/**
 * Filter buttons of the projects section. The cards are rendered on the server:
 * the filter only hides the ones of other categories with a CSS rule.
 */
export default function ProjectFilters({
  gridId,
  filters,
}: {
  gridId: string;
  filters: { value: string; label: string }[];
}) {
  const [filter, setFilter] = useState(ALL);

  return (
    <>
      {filter !== ALL && (
        <style>{`#${gridId} > [data-category]:not([data-category="${filter}"]) { display: none; }`}</style>
      )}
      {filters.map((f) => (
        <button
          key={f.value}
          onClick={() => setFilter(f.value)}
          aria-pressed={filter === f.value}
          aria-controls={gridId}
          className={`h-11 rounded-full px-[18px] font-mono text-[14px] transition ${
            filter === f.value
              ? "bg-cyan font-medium text-[#04121a] shadow-[0_0_20px_rgba(34,211,238,0.35)]"
              : "border border-white/10 bg-white/[0.02] text-[#d5d9e4] hover:border-cyan/40 hover:text-cyan"
          }`}
        >
          {f.label}
        </button>
      ))}
    </>
  );
}
