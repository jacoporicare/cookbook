#!/bin/bash

cd "$(dirname $0)"

if [[ ! -d node_modules ]]; then
  echo "node_modules not found, run ./install-node_modules.sh first."
  exit 1
fi

rm function.zip
zip -r function.zip .

aws lambda create-function --function-name CreateThumbnail \
  --zip-file fileb://function.zip --handler index.handler --runtime nodejs12.x \
  --timeout 30 --memory-size 1024 \
  --role arn:aws:iam::940363025876:role/lambda-s3access

aws lambda create-function --function-name RecreateThumbnails \
  --zip-file fileb://function.zip --handler index.recreateHandler --runtime nodejs12.x \
  --timeout 300 --memory-size 1024 \
  --role arn:aws:iam::940363025876:role/lambda-s3access
