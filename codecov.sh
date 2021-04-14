#!/bin/bash 
source .env

if [ -z "$CODECOV_TOKEN" ]; then echo "CODECOV_TOKEN not provided"; exit 1; fi

npx nyc report --reporter=json
bash <(curl -s https://codecov.io/bash) -f ./coverage/coverage-final.json -t $CODECOV_TOKEN
