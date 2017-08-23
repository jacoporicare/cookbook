FROM node:6-alpine as builder
ENV NODE_ENV development
WORKDIR /srv/app
COPY server server
COPY client client
RUN cd server && yarn && yarn build
RUN cd client && yarn && yarn build
ENV NODE_ENV production
COPY server/package.json server/yarn.lock server/dist/
RUN cd server/dist && yarn

FROM node:6-alpine
ENV NODE_ENV production
WORKDIR /srv/app
COPY --from=builder /srv/app/server/dist .
COPY --from=builder /srv/app/client/dist public

EXPOSE 3000

CMD ["yarn", "start"]
