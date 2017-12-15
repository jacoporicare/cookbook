#!/bin/sh

set -e

CONTAINER_NAME=mongo

if [[ -n $(docker ps -a | grep -E "Exited.*$CONTAINER_NAME$") ]]; then
  docker start $CONTAINER_NAME
elif [[ -z $(docker ps | grep "$CONTAINER_NAME$") ]]; then
  docker run -d \
    --name $CONTAINER_NAME \
    -p 27017:27017 \
    -v ~/dev/private/mongo_data:/data/db \
    mongo:3.4
fi

echo 'Mongo running\n'
