#!/bin/bash

docker-compose \
  -f "${BASH_SOURCE%/*}/docker-compose.dev.yml" \
  -p "cookbook-dev" \
  up
