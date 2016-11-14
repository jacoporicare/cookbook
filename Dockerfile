FROM node:6

ENV NODE_ENV production

RUN mkdir -p /srv/app
WORKDIR /srv/app

COPY package.json /srv/app
RUN npm install
COPY . /srv/app

EXPOSE 3000

CMD [ "npm", "start" ]