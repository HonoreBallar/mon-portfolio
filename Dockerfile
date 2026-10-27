# syntax=docker/dockerfile:1

FROM node:24-alpine AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# No database at build time: the home page is prerendered with the fallback content,
# then refreshed from PostgreSQL a minute after the container starts
RUN npm run build

# One-shot image applying the SQL migrations (docker compose "migrate" service).
# Only the two packages the script needs, at the versions of package.json.
FROM base AS migrate
COPY package.json /tmp/package.json
RUN npm install --no-save --no-package-lock --ignore-scripts       $(node -p "['drizzle-orm', 'postgres'].map((n) => n + '@' + require('/tmp/package.json').dependencies[n]).join(' ')")     && rm /tmp/package.json
COPY drizzle ./drizzle
COPY scripts ./scripts
CMD ["node", "scripts/migrate.mjs"]

# Production image: Next.js standalone server, run as a non-root user
FROM base AS runner
ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME=0.0.0.0
RUN addgroup -S nodejs && adduser -S nextjs -G nodejs
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s CMD wget -qO- http://127.0.0.1:3000/ >/dev/null || exit 1
CMD ["node", "server.js"]
