"use client";

import { useState, type FormEvent } from "react";
import type { Portfolio } from "@/lib/data";
import { API_URL } from "@/lib/env";
import { Reveal } from "./ui";

const field =
  "w-full rounded-[12px] border border-white/[0.08] bg-[#06070d] px-4 text-[16px] text-text placeholder:text-[#5b6175] outline-none transition focus:border-cyan/60 focus:shadow-[0_0_0_3px_rgba(34,211,238,0.12)]";

type Status = "idle" | "sending" | "sent" | "error";

const BUTTON_LABEL: Record<Status, string> = {
  idle: "Envoyer le message",
  sending: "Envoi en cours…",
  sent: "Message envoyé ✓",
  error: "Envoyer le message",
};

export default function Contact({ email, socials }: { email: string; socials: Portfolio["socials"] }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    setError("");

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
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
      if (res.status === 429) setError("Trop de messages envoyés. Réessayez dans une heure.");
      else if (res.status === 422) setError("Vérifiez votre email et votre message (10 caractères minimum).");
      else setError("Une erreur est survenue. Réessayez ou écrivez-moi directement par email.");
    } catch {
      setStatus("error");
      setError("Impossible d’envoyer le message. Réessayez ou écrivez-moi directement par email.");
    }
  }

  return (
    <section id="contact" className="relative scroll-mt-20 pb-[50px] pt-[180px]">
      <div className="container-x">
        <Reveal className="xl:-mx-[57px]">
          <div className="relative overflow-hidden rounded-[28px] border border-white/[0.07] bg-gradient-to-br from-[#0b0d18] to-[#080a12] px-5 py-10 sm:px-8 sm:py-12 md:px-[72px] md:py-[72px]">
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-40 -right-40 h-[360px] w-[360px] md:h-[520px] md:w-[520px] rounded-full"
              style={{ background: "radial-gradient(circle, rgba(34,211,238,0.22), transparent 65%)" }}
            />

            <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
              <div className="min-w-0">
                <p className="font-mono text-[14px] text-cyan">05 — Contact</p>
                <h2 className="mt-4 text-[28px] font-bold sm:text-[36px] leading-[1.1] tracking-[-0.02em] text-text md:text-[46px]">
                  Un projet ambitieux ?
                  <br />
                  Construisons-le.
                </h2>
                <p className="mt-6 max-w-[560px] text-[16px] sm:mt-7 sm:text-[18px] leading-[1.6] text-muted">
                  Je réponds rapidement. Parlons de votre produit, de votre assistant IA ou de vos déploiements.
                </p>
                <a
                  href={`mailto:${email}`}
                  className="mt-8 inline-flex items-center gap-3 break-all font-mono text-[15px] font-semibold text-cyan transition hover:text-[#67e8f9]"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="M3 7l9 6 9-6" />
                  </svg>
                  {email}
                </a>
                <div className="mt-7 flex flex-wrap gap-3">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-[10px] border border-white/10 bg-white/[0.02] px-4 py-2.5 font-mono text-[15px] font-semibold text-[#d5d9e4] transition hover:-translate-y-0.5 hover:border-cyan/50 hover:text-cyan"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>

              <form onSubmit={onSubmit} className="flex min-w-0 flex-col">
                <label htmlFor="name" className="text-[14px] font-medium text-[#c3c8d6]">Nom</label>
                <input id="name" name="name" required placeholder="Votre nom" className={`${field} mt-2.5 h-[52px]`} />

                <label htmlFor="email" className="mt-5 text-[14px] font-medium text-[#c3c8d6]">Email</label>
                <input id="email" name="email" type="email" required placeholder="vous@entreprise.com" className={`${field} mt-2.5 h-[52px]`} />

                <label htmlFor="message" className="mt-5 text-[14px] font-medium text-[#c3c8d6]">Votre projet</label>
                <textarea id="message" name="message" required minLength={10} rows={4} placeholder="Décrivez votre idée..." className={`${field} mt-2.5 min-h-[110px] resize-y py-3.5`} />

                {/* Honeypot: invisible to people, filled by spam bots */}
                <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] h-0 w-0 opacity-0" />

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="mt-4 h-[53px] rounded-[12px] bg-cyan text-[16px] font-semibold text-[#04121a] shadow-[0_0_28px_rgba(34,211,238,0.3)] transition hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(34,211,238,0.5)] disabled:cursor-wait disabled:opacity-70"
                >
                  {BUTTON_LABEL[status]}
                </button>
                {error && (
                  <p role="alert" className="mt-3 text-[14px] text-[#f87171]">
                    {error}
                  </p>
                )}
              </form>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
