FROM node:24-alpine AS builder

RUN apk add --no-cache python3 make g++
RUN corepack enable

WORKDIR /srv
COPY package.json yarn.lock .yarnrc.yml ./
COPY api/package.json api/
RUN yarn workspaces focus cookbook-api
COPY api api
RUN yarn workspace cookbook-api build
RUN yarn workspaces focus cookbook-api --production


FROM node:24-alpine

ENV NODE_ENV=production
WORKDIR /srv/app

COPY --from=builder /srv/api/build .
COPY --from=builder /srv/node_modules node_modules

EXPOSE 4000

CMD ["node", "main.js"]
