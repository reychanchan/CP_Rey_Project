#!/bin/bash


NEW_VERSION=$1


docker buildx build --platform linux/amd64  -t reychanchan/frontend-prod:$NEW_VERSION -f frontend/Dockerfile ./frontend --no-cache
docker push reychanchan/frontend-prod:$NEW_VERSION


docker buildx build --platform linux/amd64  -t reychanchan/backend-prod:$NEW_VERSION -f backend/Dockerfile ./backend --no-cache
docker push reychanchan/backend-prod:$NEW_VERSION