#!/bin/sh

./gradlew clean bootJar
docker build -t seonba/chat-backend .
docker rmi $(docker images -f "dangling=true" -q)
