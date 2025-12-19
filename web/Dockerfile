FROM node:24-alpine AS builder

RUN corepack enable

WORKDIR /srv
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn .yarn
RUN yarn workspaces focus cookbook-web --production=false
COPY web web
RUN yarn workspace cookbook-web build


FROM node:24-alpine

ENV NODE_ENV=production
WORKDIR /srv/app

COPY --from=builder /srv/web/.next/standalone ./
COPY --from=builder /srv/web/.next/static .next/static
COPY --from=builder /srv/web/public public

EXPOSE 3000

CMD ["node", "web/server.js"]
