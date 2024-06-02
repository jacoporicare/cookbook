FROM node:20-alpine as builder

WORKDIR /srv
RUN npm i -g npm@^8
COPY package.json package-lock.json ./
RUN npm ci --unsafe-perm
COPY . .
RUN npm run build
RUN mv package.json package-lock.json .env node_modules build/ \
  && cd build \
  && npm prune --production


FROM node:20-alpine

ENV NODE_ENV production
WORKDIR /srv/app

COPY --from=builder /srv/build .

EXPOSE 4000

CMD ["node", "main.js"]
