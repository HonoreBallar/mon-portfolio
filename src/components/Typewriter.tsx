"use client";

import { useEffect, useState } from "react";
import type { Portfolio } from "@/lib/data";

// The only interactive part of the hero: the rest is rendered on the server
export default function Typewriter({ roles }: { roles: Portfolio["roles"] }) {
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
