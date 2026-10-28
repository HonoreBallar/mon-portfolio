import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

// Preview card shown when the site is shared (LinkedIn, WhatsApp, Slack…)
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Honoré Amounan";

const asset = (file: string) => readFile(join(process.cwd(), "assets/og", file));
const [grotesk, mono, logo] = await Promise.all([
  asset("SpaceGrotesk-Bold.ttf"),
  asset("JetBrainsMono-Medium.ttf"),
  asset("akh-logo.png"),
]);
const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = getDictionary(hasLocale(lang) ? lang : "fr");
  const { before, highlight, after } = t.hero.tagline;
  const role = t.hero.role.split(" · ")[0];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 48,
          padding: "0 80px",
          background: "radial-gradient(ellipse 70% 90% at 85% 15%, #0b3a44 0%, #071a22 35%, #05060b 70%)",
          color: "#f4f6fb",
          fontFamily: "Space Grotesk",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div style={{ display: "flex", fontFamily: "JetBrains Mono", fontSize: 28, color: "#22d3ee" }}>
            ~/portfolio $ whoami
          </div>
          <div style={{ display: "flex", marginTop: 18, fontSize: 84, lineHeight: 1, letterSpacing: "-0.035em", whiteSpace: "nowrap" }}>
            Honoré Amounan<span style={{ color: "#22d3ee" }}>.</span>
          </div>
          <div style={{ display: "flex", marginTop: 26, fontFamily: "JetBrains Mono", fontSize: 30, color: "#c3c8d6" }}>
            {role}
          </div>
          <div style={{ display: "flex", marginTop: 40, fontSize: 32, lineHeight: 1.3, color: "#9aa1b5" }}>
            {before + highlight + after}
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain <img> only */}
        <img src={logoSrc} alt="" width={230} height={230} style={{ boxShadow: "0 0 80px rgba(34,211,238,0.35)", borderRadius: 999 }} />
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Space Grotesk", data: grotesk, weight: 700, style: "normal" },
        { name: "JetBrains Mono", data: mono, weight: 500, style: "normal" },
      ],
    },
  );
}
