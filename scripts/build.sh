#!/bin/sh

export NODE_ENV=production

ROOT=$(dirname $0)/..
DIST=$ROOT/dist

rm -rf $DIST
mkdir -p $DIST/public

cd $ROOT/server
yarn build
cp -r dist/* $DIST

cd $ROOT/client
yarn build
cp -r dist/* $DIST/public
