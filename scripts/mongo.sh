#!/bin/bash
set -e

[[ $1 = start ]] && docker compose -f docker-compose.mongo.yml -p cookbook-mongo up -d
[[ $1 = stop ]] && docker compose -f docker-compose.mongo.yml -p cookbook-mongo down
