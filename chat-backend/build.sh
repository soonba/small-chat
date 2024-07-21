#!/bin/sh

./gradlew clean bootJar
docker build --platform linux/amd64 -t seonba/chat-backend .
docker rmi $(docker images -f "dangling=true" -q)
