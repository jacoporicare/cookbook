#!/usr/bin/env bash

./build.sh latest
./push.sh latest
./update.sh prod
