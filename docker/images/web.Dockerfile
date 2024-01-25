# Base image
FROM node:19.2.0 as base

## Prepare env
WORKDIR web
COPY package.json .
RUN npm install

## Settings
ENV HOST=0.0.0.0
ENV PORT=3000

# [Website] panovskiy.ru
FROM base as panovskiy

## Copy configs
COPY nuxt.config.ts .
COPY tsconfig.json .

## Copy project files
COPY app.vue .
COPY public public
COPY server server

## Build step
RUN npm run build

## Run step
ENTRYPOINT ["node", ".output/server/index.mjs"]
