#!/bin/bash

set -e

CONTAINER_NAME=cookbook_mongo
DATA_SRC=~/dev/private/mongo_data/cookbook
DATA_DST=/data/db

docker start $CONTAINER_NAME 1>/dev/null 2>&1 ||
  docker run -d \
    --name $CONTAINER_NAME \
    -p 27017:27017 \
    --mount type=bind,src=$DATA_SRC,dst=$DATA_DST \
    mongo:4.2 1>/dev/null
