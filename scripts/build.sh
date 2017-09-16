#!/bin/sh

export NODE_ENV=production

root=$(dirname $0)/..
dist=$root/dist

rm -rf $dist
mkdir -p $dist/public

cd $root/server
yarn build
cp -r dist/* $dist

cd $root/client
yarn build
cp -r dist/* $dist/public
