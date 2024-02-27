# Base image
FROM node:19.2.0 as base
ARG CMS_URL
ARG CMS_USER
ARG CMS_PASSWORD

## Prepare env
WORKDIR web
COPY package.json .
RUN npm install
RUN curl -fsSL https://d2lang.com/install.sh | sh -s --

## Settings
ENV HOST=0.0.0.0
ENV PORT=3000

## Copy configs
COPY astro.config.mjs .
COPY tailwind.config.mjs .
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
RUN TARGET=cyberpony CMS_URL=$CMS_URL CMS_USER=$CMS_USER CMS_PASSWORD=$CMS_PASSWORD npm run build
RUN cp -r public/cyberpony/d2 dist/client
ENTRYPOINT ["node", "./dist/server/entry.mjs"]

# [Website] foxdriven.ru
FROM base as foxdriven
RUN TARGET=foxdriven CMS_URL=$CMS_URL CMS_USER=$CMS_USER CMS_PASSWORD=$CMS_PASSWORD npm run build
ENTRYPOINT ["node", "./dist/server/entry.mjs"]

# [Website] bigdatawhale.ru
FROM base as bigdatawhale
RUN TARGET=bigdatawhale npm run build
ENTRYPOINT ["node", "./dist/server/entry.mjs"]
