#!/bin/bash

BUCKET=$1

if [[ -z $BUCKET ]]; then
  echo "Usage ./aws-recreate-thumbnails.sh <bucket>"
  exit 1
fi

aws lambda invoke \
  --function-name RecreateThumbnails \
  --cli-binary-format raw-in-base64-out \
  --payload "{\"bucket\":\"$BUCKET\"}" \
  /dev/null
