FROM node:6-alpine

ENV NODE_ENV development
ENV PORT 80

RUN mkdir -p /srv/app
WORKDIR /srv/app

COPY ./package.json ./yarn.lock ./

RUN yarn

COPY . .

EXPOSE 80

ENTRYPOINT ["yarn", "dev"]
