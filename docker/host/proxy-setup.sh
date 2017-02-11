#!/usr/bin/env bash

mkdir -p ~/certs

docker network create web

docker run -d -p 80:80 -p 443:443 \
  -v ~/certs:/etc/nginx/certs:ro \
  -v /etc/nginx/vhost.d \
  -v /usr/share/nginx/html \
  -v /var/run/docker.sock:/tmp/docker.sock:ro \
  -v ~/nginx.conf:/etc/nginx/conf.d/nginx.conf:ro \
  --name nginx-proxy \
  --network web \
  --restart always \
  jwilder/nginx-proxy

docker run -d \
  -v ~/certs:/etc/nginx/certs:rw \
  --volumes-from nginx-proxy \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  --name nginx-proxy-letsencrypt \
  --network web \
  --restart always \
  jrcs/letsencrypt-nginx-proxy-companion
