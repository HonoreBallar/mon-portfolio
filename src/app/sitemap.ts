import type { MetadataRoute } from "next";
import { localePath, LOCALES } from "@/i18n/config";
import { SITE_URL } from "@/lib/site";

const absolute = (path: string) => new URL(path, SITE_URL).href;

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(LOCALES.map((l) => [l, absolute(localePath(l))]));
  return LOCALES.map((locale) => ({
    url: absolute(localePath(locale)),
    changeFrequency: "monthly",
    priority: locale === "fr" ? 1 : 0.9,
    alternates: { languages },
  }));
}
