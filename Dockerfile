FROM node:20.18.1 AS builder

COPY ./ /app

WORKDIR /app
Run npm install && npm run build

FROM nginx:1.27.2-alpine-slim
COPY --from=builder /app/dist /usr/share/nginx/html