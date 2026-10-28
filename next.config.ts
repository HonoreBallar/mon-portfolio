import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Self-contained server in .next/standalone, used by the Docker image (Vercel ignores it)
  output: "standalone",
  // Fonts and logo read at runtime by the Open Graph image (not detected automatically)
  outputFileTracingIncludes: {
    "/[lang]/opengraph-image": ["./assets/og/**/*"],
  },
  cacheComponents: true,
  experimental: {
    // The site (app/[lang]) and the admin have separate root layouts
    globalNotFound: true,
  },
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
