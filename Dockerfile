FROM node:14-alpine as builder

WORKDIR /srv
COPY package.json package-lock.json ./
RUN npm ci --unsafe-perm
COPY . .
RUN npm run build
RUN mkdir app \
  && cp -a package.json package-lock.json .env public app/ \
  && cd app \
  && NODE_ENV=production npm ci --unsafe-perm


FROM node:14-alpine

ENV NODE_ENV production
WORKDIR /srv/app

COPY --from=builder /srv/.next .next
COPY --from=builder /srv/app .

EXPOSE 3000

CMD ["npm", "start"]
