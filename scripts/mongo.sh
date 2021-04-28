#!/bin/bash
set -e

docker compose -f docker-compose.mongo.yml -p cookbook-mongo up -d
