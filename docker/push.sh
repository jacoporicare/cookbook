#!/usr/bin/env bash

if [ -z "$1" ]; then
    echo "Tag not set: dev, latest"
    exit 1
fi

docker push "jacoporicare/cookbook:$1"