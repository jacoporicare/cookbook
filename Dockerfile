FROM node:12-alpine as builder

WORKDIR /srv
COPY package.json yarn.lock ./
RUN yarn
COPY . .
RUN yarn build
RUN mkdir app \
  && cp package.json yarn.lock app/ \
  && cd app \
  && NODE_ENV=production yarn


FROM node:12-alpine

ENV NODE_ENV production
WORKDIR /srv/app

COPY --from=builder /srv/build build
COPY --from=builder /srv/app .

VOLUME /tmp/cookbook

EXPOSE 3000

CMD ["yarn", "start:prod"]
