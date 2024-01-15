FROM node:lts-alpine

WORKDIR /app

COPY ./package.json ./
RUN yarn
ENV PORT=3000

COPY . .
CMD ["npm","run","start"]