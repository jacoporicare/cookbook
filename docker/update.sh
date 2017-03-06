#!/usr/bin/env bash

if [ -z "$1" ]; then
    echo "Environment not set: dev, latest"
    exit 1
fi

ssh ricar@jakubricar.cz "./cookbook/start.sh $1"
