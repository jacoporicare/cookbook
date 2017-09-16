FROM node:8.5.0-alpine

ENV NODE_ENV production

WORKDIR /srv/app

COPY dist/package.json dist/yarn.lock ./
RUN yarn
COPY dist/ ./

EXPOSE 3000

CMD ["yarn", "start"]
