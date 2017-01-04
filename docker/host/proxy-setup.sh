#!/usr/bin/env bash

docker network create web
docker run -d -p 80:80 -v /var/run/docker.sock:/tmp/docker.sock:ro \
    -v ~/nginx.conf:/etc/nginx/conf.d/nginx.conf:ro \
    --name nginx-proxy --network web --restart always jwilder/nginx-proxy
