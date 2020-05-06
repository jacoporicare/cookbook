#!/bin/bash

cd "$(dirname $0)"

if [[ ! -d node_modules ]]; then
  echo "node_modules not found, run ./install-node_modules.sh first."
  exit 1
fi

rm function.zip
zip -r function.zip .

aws lambda update-function-code --function-name CreateThumbnail --zip-file fileb://function.zip
aws lambda update-function-code --function-name RecreateThumbnails --zip-file fileb://function.zip
