FROM node:24-alpine AS builder

RUN apk add --no-cache python3 make g++

WORKDIR /srv
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build
RUN mv package.json package-lock.json node_modules build/ \
  && cd build \
  && npm prune --production


FROM node:24-alpine

ENV NODE_ENV=production
WORKDIR /srv/app

COPY --from=builder /srv/build .

EXPOSE 4000

CMD ["node", "main.js"]
