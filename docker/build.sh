#!/usr/bin/env bash

ci=false

while getopts "c" option; do
  case $option in
    c) ci=true;;
  esac
done

shift $(($OPTIND - 1))

if [ -z "$1" ]; then
  echo "Tag not set: dev, latest"
  exit 1
fi

cd ${BASH_SOURCE%/*}/../server
yarn build

cd ../client
yarn build

cd ..
if $ci; then
  docker build --rm=false -t "docker.jakubricar.cz/cookbook:$1" .
else
  docker build -t "docker.jakubricar.cz/cookbook:$1" .
fi
