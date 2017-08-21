FROM node:6-alpine

ENV NODE_ENV production

RUN mkdir -p /srv/app
WORKDIR /srv/app

COPY ./server/package.json ./
RUN yarn && yarn cache clean
COPY ./server/dist/ ./
COPY ./client/dist/ ./public/

EXPOSE 3000

CMD ["yarn", "start"]
