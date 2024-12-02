FROM node:20.18.1 AS builder

COPY ./ /app

ARG VITE_SOME_KEY
ENV VITE_SOME_KEY=${VITE_SOME_KEY}
ARG VITE_URL_API
ENV VITE_URL_API=${VITE_URL_API}

WORKDIR /app
RUN npm install && npm run build

FROM nginx:1.27.2-alpine-slim
COPY --from=builder /app/dist /usr/share/nginx/html