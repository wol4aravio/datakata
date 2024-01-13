# Base image
FROM node:19.2.0 as base

## Prepare env
COPY package.json .
RUN npm install

## Env vars
EXPOSE 3000
ENV HOST=0.0.0.0
ENV PORT=3000

# [Website] panovskiy.ru
FROM base as panovskiy
LABEL website="panovskiy.ru"
LABEL version="0.0.1"

## Copy configs
COPY nuxt.config.ts .
COPY tsconfig.json .

## Copy project files
COPY app.vue .
COPY public .
COPY server .

## Build step
RUN npm run build

## Run step
ENTRYPOINT ["node", "./dist/server/entry.mjs"]
