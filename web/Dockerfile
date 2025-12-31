FROM node:24-alpine AS builder

RUN corepack enable

WORKDIR /app
COPY package.json yarn.lock .yarnrc.yml ./
COPY web/package.json web/
RUN yarn workspaces focus cookbook-web
COPY web web
ENV NEXT_TELEMETRY_DISABLED=1
RUN yarn workspace cookbook-web build


FROM node:24-alpine

# Install tini for proper signal handling
RUN apk add --no-cache tini

WORKDIR /app

# Add non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
  adduser --system --uid 1001 nextjs

# Set correct permissions for prerender cache
RUN mkdir .next && chown nextjs:nodejs .next

# Copy standalone output
# Next.js standalone output includes only necessary files
COPY --from=builder --chown=nextjs:nodejs /app/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/web/.next/static ./web/.next/static

# Copy public assets
COPY --from=builder --chown=nextjs:nodejs /app/web/public ./web/public

# Disable telemetry at runtime
ENV NEXT_TELEMETRY_DISABLED=1

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:3000 || exit 1

# Start the application using the standalone server
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "web/server.js"]
