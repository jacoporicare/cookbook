FROM node:7

ENV NODE_ENV production

RUN mkdir -p /srv/app
WORKDIR /srv/app

COPY package.json /srv/app
RUN yarn
COPY . /srv/app

EXPOSE 3000

CMD [ "yarn", "start" ]
