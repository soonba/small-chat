FROM node:lts-alpine

WORKDIR /app

COPY ./package.json ./
ENV PORT=3000

COPY . .
CMD ["npm","run","start"]