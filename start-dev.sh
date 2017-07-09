#!/usr/bin/env bash

cd server
yarn start &

cd ../client
yarn start
