FROM node:6-alpine as builder
ENV NODE_ENV development
WORKDIR /srv/app

COPY server/package.json server/yarn.lock server/
RUN cd server && yarn
COPY server server
RUN cd server && yarn build

COPY client/package.json client/yarn.lock client/
RUN cd client && yarn
COPY client client
RUN cd client && yarn build

ENV NODE_ENV production
COPY server/package.json server/yarn.lock tmp/
RUN cd tmp && yarn
RUN cp -a tmp/. server/dist

FROM node:6-alpine
ENV NODE_ENV production
WORKDIR /srv/app
COPY --from=builder /srv/app/server/dist .
COPY --from=builder /srv/app/client/dist public

EXPOSE 3000

CMD ["yarn", "start"]
