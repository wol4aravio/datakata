# Base image
FROM node:19.2.0 as base

## Prepare env
WORKDIR web
COPY package.json .
RUN npm install

## Settings
ENV HOST=0.0.0.0
ENV PORT=3000

## Copy configs
COPY astro.config.mjs .
COPY tsconfig.json .

## Copy project files
COPY public public
COPY src src
COPY common common

# [Website] panovskiy.ru
FROM base as panovskiy
RUN TARGET=panovskiy npm run build
ENTRYPOINT ["node", "./dist/server/entry.mjs"]

# [Website] datakata.ru
FROM base as datakata
RUN TARGET=datakata npm run build
ENTRYPOINT ["node", "./dist/server/entry.mjs"]

# [Website] cyberpony.ru
FROM base as cyberpony
RUN TARGET=cyberpony npm run build
ENTRYPOINT ["node", "./dist/server/entry.mjs"]

# [Website] foxdriven.ru
FROM base as foxdriven
RUN TARGET=foxdriven npm run build
ENTRYPOINT ["node", "./dist/server/entry.mjs"]

# [Website] bigdatawhale.ru
FROM base as bigdatawhale
RUN TARGET=bigdatawhale npm run build
ENTRYPOINT ["node", "./dist/server/entry.mjs"]
