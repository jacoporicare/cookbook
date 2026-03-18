FROM node:24-alpine AS builder

RUN apk add --no-cache python3 make g++

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /srv
ENV CI=true
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY api/package.json api/
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm --filter api install --frozen-lockfile
COPY api api
RUN pnpm --filter api build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm --filter api deploy --prod /srv/deployed


FROM node:24-alpine

ENV NODE_ENV=production
WORKDIR /srv/app

COPY --from=builder /srv/api/build .
COPY --from=builder /srv/deployed/node_modules node_modules

EXPOSE 4000

CMD ["node", "main.js"]
