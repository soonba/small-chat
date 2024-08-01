FROM node:18 AS builder
WORKDIR /usr/src/app
COPY . .
RUN yarn
RUN yarn build

# Step 2 Application Start
FROM node:18-alpine
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
#COPY --from=builder /usr/src/app/.env ./.env
CMD ["node", "dist/main.js"]
