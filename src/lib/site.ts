/**
 * Public URL of the site, used for absolute links (Open Graph, sitemap, JSON-LD).
 * NEXT_PUBLIC_SITE_URL wins (custom domain); on Vercel the production domain is provided automatically.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");
