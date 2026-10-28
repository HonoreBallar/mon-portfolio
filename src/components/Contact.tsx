import type { Dictionary } from "@/i18n/dictionaries";
import type { Portfolio } from "@/lib/data";
import ContactForm from "./ContactForm";
import { Reveal } from "./ui";

export default function Contact({
  t,
  email,
  socials,
}: {
  t: Dictionary["contact"];
  email: string;
  socials: Portfolio["socials"];
}) {
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
                <p className="font-mono text-[14px] text-cyan">{t.kicker}</p>
                <h2 className="mt-4 text-[28px] font-bold sm:text-[36px] leading-[1.1] tracking-[-0.02em] text-text md:text-[46px]">
                  {t.title[0]}
                  <br />
                  {t.title[1]}
                </h2>
                <p className="mt-6 max-w-[560px] text-[16px] sm:mt-7 sm:text-[18px] leading-[1.6] text-muted">
                  {t.text}
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

              <ContactForm t={t} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
