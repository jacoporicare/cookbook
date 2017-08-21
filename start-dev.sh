#!/bin/sh

cd server
yarn dev &

cd ../client
yarn dev
