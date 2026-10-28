"use client";

import { useState, type FormEvent } from "react";
import type { Dictionary } from "@/i18n/dictionaries";

const field =
  "w-full rounded-[12px] border border-white/[0.08] bg-[#06070d] px-4 text-[16px] text-text placeholder:text-[#5b6175] outline-none transition focus:border-cyan/60 focus:shadow-[0_0_0_3px_rgba(34,211,238,0.12)]";

type Status = "idle" | "sending" | "sent" | "error";

// The only interactive part of the contact section
export default function ContactForm({ t }: { t: Dictionary["contact"] }) {
  const buttonLabel: Record<Status, string> = { ...t.button, error: t.button.idle };
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });

      if (res.ok) {
        setStatus("sent");
        form.reset();
        return;
      }

      setStatus("error");
      if (res.status === 429) setError(t.errors.tooMany);
      else if (res.status === 422) setError(t.errors.invalid);
      else if (res.status === 503) setError(t.errors.unavailable);
      else setError(t.errors.generic);
    } catch {
      setStatus("error");
      setError(t.errors.network);
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex min-w-0 flex-col">
      <label htmlFor="name" className="text-[14px] font-medium text-[#c3c8d6]">{t.name}</label>
      <input id="name" name="name" required placeholder={t.namePlaceholder} className={`${field} mt-2.5 h-[52px]`} />

      <label htmlFor="email" className="mt-5 text-[14px] font-medium text-[#c3c8d6]">{t.email}</label>
      <input id="email" name="email" type="email" required placeholder={t.emailPlaceholder} className={`${field} mt-2.5 h-[52px]`} />

      <label htmlFor="message" className="mt-5 text-[14px] font-medium text-[#c3c8d6]">{t.message}</label>
      <textarea id="message" name="message" required minLength={10} rows={4} placeholder={t.messagePlaceholder} className={`${field} mt-2.5 min-h-[110px] resize-y py-3.5`} />

      {/* Honeypot: invisible to people, filled by spam bots */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] h-0 w-0 opacity-0" />

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-4 h-[53px] rounded-[12px] bg-cyan text-[16px] font-semibold text-[#04121a] shadow-[0_0_28px_rgba(34,211,238,0.3)] transition hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(34,211,238,0.5)] disabled:cursor-wait disabled:opacity-70"
      >
        {buttonLabel[status]}
      </button>
      {error && (
        <p role="alert" className="mt-3 text-[14px] text-[#f87171]">
          {error}
        </p>
      )}
    </form>
  );
}
