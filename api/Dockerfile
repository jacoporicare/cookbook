FROM node:24-alpine AS builder

RUN apk add --no-cache python3 make g++
RUN corepack enable

WORKDIR /srv
ENV CI=true
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY api/package.json api/
RUN pnpm --filter api install --frozen-lockfile
COPY api api
RUN pnpm --filter api build
RUN pnpm --filter api install --frozen-lockfile --prod


FROM node:24-alpine

ENV NODE_ENV=production
WORKDIR /srv/app

COPY --from=builder /srv/api/build .
COPY --from=builder /srv/node_modules node_modules

EXPOSE 4000

CMD ["node", "main.js"]
