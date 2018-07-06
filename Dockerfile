FROM node:8.11 as builder

WORKDIR /srv/server
COPY server/package.json server/yarn.lock ./
ENV NODE_ENV development
RUN yarn
COPY server .
ENV NODE_ENV production
RUN yarn build

WORKDIR /srv/client
COPY client/package.json client/yarn.lock ./
ENV NODE_ENV development
RUN yarn
COPY client .
ENV NODE_ENV production
RUN yarn build


FROM node:8.11

ENV NODE_ENV production
WORKDIR /srv/app

COPY server/package.json server/yarn.lock ./
RUN yarn
COPY --from=builder /srv/server/dist .
COPY --from=builder /srv/client/dist public

EXPOSE 3000

CMD ["yarn", "start"]
