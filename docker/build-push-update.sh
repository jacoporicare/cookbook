#!/usr/bin/env bash

cd ${BASH_SOURCE%/*}
./build.sh latest
./push.sh latest
./update.sh prod
