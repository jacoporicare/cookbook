FROM node:24-alpine AS builder

WORKDIR /srv
COPY package.json package-lock.json .npmrc ./
RUN npm ci --unsafe-perm
COPY . .
RUN npm run build
RUN mkdir build \
  && mv package.json package-lock.json next.config.js .next .npmrc public node_modules build/ \
  && cd build \
  && npm prune --production


FROM node:24-alpine

ENV NODE_ENV=production
WORKDIR /srv/app

COPY --from=builder /srv/build .

EXPOSE 3000

CMD ["npm", "start"]
