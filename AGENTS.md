# Repository Guidelines

## Project Structure & Module Organization
- `api-gateway/`: Nginx gateway (Dockerfile + nginx config).
- `chat-client/`: React + Vite frontend (`src/`, `public/`, `dist/`).
- `chat-service/`: NestJS service (`src/`, `dist/`) with GraphQL/WebSocket infrastructure.
- `chat-backend/`: Spring Boot backend (`src/main/`, `src/test/`) built with Gradle.
- `docker-compose.yml`: local infra (Postgres, MongoDB, Redis, RabbitMQ). Commented services show optional containers.

## Build, Test, and Development Commands
Frontend (from `chat-client/`):
- `npm install`: install dependencies.
- `npm run dev`: local dev server.
- `npm run build`: production build to `dist/`.
- `npm run lint:check` / `npm run prettier:check`: static checks.
- `npm run storybook`: component docs.

Service (from `chat-service/`):
- `npm install`: install dependencies.
- `npm run start`: run NestJS service.
- `npm run build`: build to `dist/`.
- `npm run lint` / `npm run format`: lint or format.

Backend (from `chat-backend/`):
- `./gradlew bootRun`: run Spring Boot app.
- `./gradlew test`: run JUnit tests.
- `./gradlew clean bootJar`: build artifact.
- `./build.sh`: build Docker image.

Infra:
- `docker compose up`: start databases and brokers.

## Coding Style & Naming Conventions
- TypeScript/React code uses ESLint + Prettier; prefer running `npm run lint-prettier` in `chat-client/`.
- NestJS uses ESLint + Prettier via `npm run lint` and `npm run format` in `chat-service/`.
- Spring Boot follows Java conventions: `UpperCamelCase` for classes, `lowerCamelCase` for methods/fields, and package names in lowercase.

## Testing Guidelines
- NestJS tests use Jest with `*.spec.ts` under `chat-service/src/` (run `npx jest`).
- Spring Boot tests live in `chat-backend/src/test/` (run `./gradlew test`).
- If adding UI tests, align them with Storybook and keep snapshots under `chat-client/`.

## Commit & Pull Request Guidelines
- Commit messages follow `type(scope) : summary`, e.g., `fix(userChatList) : ...`, `feat(chat-service) : ...`.
- Keep commits scoped and descriptive; Korean summaries are acceptable.
- PRs should include a short description, key changes, testing notes, and screenshots for UI changes.
