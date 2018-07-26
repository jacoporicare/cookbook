FROM node:8.11 as builder

WORKDIR /srv/server
COPY server/package.json server/yarn.lock ./
ENV NODE_ENV development
RUN yarn
COPY server .
ENV NODE_ENV production
RUN yarn build && rm -rf node_modules && yarn

WORKDIR /srv/client
COPY client/package.json client/yarn.lock ./
ENV NODE_ENV development
RUN yarn
COPY client .
ENV NODE_ENV production
RUN yarn build


FROM node:8.11-alpine

ENV NODE_ENV production
WORKDIR /srv/app

COPY --from=builder /srv/server/dist .
COPY --from=builder /srv/server/node_modules ./node_modules
COPY --from=builder /srv/client/dist public

EXPOSE 3000

CMD ["yarn", "start"]
