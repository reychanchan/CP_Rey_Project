#!/bin/bash

export DEBUG=True

docker-compose -f docker-compose.dev.yml up --build
