#!/usr/bin/env bash

if [ -z "$1" ]; then
    echo "Environment not set: dev, prod"
    exit 1
fi

docker-compose \
  -f "${BASH_SOURCE%/*}/docker-compose.yml" \
  -f "${BASH_SOURCE%/*}/docker-compose.$1.yml" \
  pull

docker-compose \
  -f "${BASH_SOURCE%/*}/docker-compose.yml" \
  -f "${BASH_SOURCE%/*}/docker-compose.$1.yml" \
  up -d
