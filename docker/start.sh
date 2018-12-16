#!/bin/bash

docker-compose \
  -f "${BASH_SOURCE%/*}/docker-compose.yml" \
  -p "cookbook-prod" \
  pull

docker-compose \
  -f "${BASH_SOURCE%/*}/docker-compose.yml" \
  -p "cookbook-prod" \
  up -d
