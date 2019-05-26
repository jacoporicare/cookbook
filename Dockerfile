FROM node:10-alpine as builder

WORKDIR /srv
COPY package.json yarn.lock ./
RUN yarn
COPY . .
RUN yarn build


FROM node:10-alpine

ENV NODE_ENV production
WORKDIR /srv/app

COPY package.json yarn.lock ./
RUN yarn
COPY --from=builder /srv/build build
COPY public build/public

EXPOSE 3000

CMD ["yarn", "start:prod"]
