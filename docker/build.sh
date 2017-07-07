#!/usr/bin/env bash

if [ -z "$1" ]; then
  echo "Tag not set: dev, latest"
  exit 1
fi

cd ${BASH_SOURCE%/*}/../server
yarn build

cd ../client
yarn build

cd ..
docker build -t "jacoporicare/cookbook:$1" .
