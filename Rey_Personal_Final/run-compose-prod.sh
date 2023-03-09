#!/bin/sh


# These are from the docker-compose file examples...
export DEBUG=$1
export NEW_VERSION=$2

docker-compose -f docker-compose.prod.yml build --no-cache
docker-compose -f docker-compose.prod.yml up 
