FROM node:8.11 as server-builder

WORKDIR /srv/src

ENV NODE_ENV development
COPY server/package.json server/yarn.lock ./
RUN yarn

ENV NODE_ENV production
COPY server .
RUN yarn build

FROM node:8.11 as client-builder

WORKDIR /srv/src

ENV NODE_ENV development
COPY client/package.json client/yarn.lock ./
RUN yarn

ENV NODE_ENV production
COPY client .
RUN yarn build


FROM node:8.11

ENV NODE_ENV production

WORKDIR /srv/app

COPY --from=server-builder /srv/src/package.json /srv/src/yarn.lock ./
RUN yarn
COPY --from=server-builder /srv/src/dist .

COPY --from=client-builder /srv/src/dist public


EXPOSE 3000

CMD ["yarn", "start"]
