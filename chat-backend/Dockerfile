FROM openjdk:17-ea-slim
WORKDIR /app
COPY ./build/libs/*.jar auth.jar

CMD ["java", "-jar", "auth.jar"]