#!/usr/bin/env bash

./${BASH_SOURCE%/*}/build.sh latest
./${BASH_SOURCE%/*}/push.sh latest
./${BASH_SOURCE%/*}/update.sh prod
