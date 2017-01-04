#!/usr/bin/env bash

if [ -z "$1" ]; then
    echo "Tag not set: dev, latest"
    exit 1
fi

cd ..
npm run build

cd dist
docker build -t "jacoporicare/cookbook:$1" .
