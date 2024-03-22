#!/bin/sh

./gradlew clean bootJar
docker build -t seonba/auth-service .
docker rmi $(docker images -f "dangling=true" -q)
