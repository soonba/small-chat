#!/bin/sh

./gradlew clean bootJar
docker build -t seonba/auth-service .