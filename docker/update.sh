#!/usr/bin/env bash

if [ -z "$1" ]; then
    echo "Environment not set: dev, prod"
    exit 1
fi

ssh ricar@zradelnik.jakubricar.cz "./cookbook/start.sh $1"
