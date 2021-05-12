#!/bin/bash
set -e

[[ $1 = start ]] && docker compose -f docker-compose.debug.yml -p cookbook up --remove-orphans --build
[[ $1 = stop ]] && docker compose -f docker-compose.debug.yml -p cookbook down
