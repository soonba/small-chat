FROM openjdk:17-ea-slim AS builder
WORKDIR /app
COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .
COPY src src
RUN chmod +x ./gradlew
RUN ./gradlew bootJar

FROM openjdk:17-ea-slim
COPY --from=builder /app/build/libs/*.jar backend.jar

CMD ["java", "-jar", "backend.jar"]