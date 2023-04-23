ARG NODE_VERSION=18.15.0
ARG NPM_VERSION=8.19.2

FROM node:$NODE_VERSION-alpine as development

WORKDIR /app

COPY package*.json ./
COPY .env ./

RUN npm i -g npm@${NPM_VERSION}

RUN npm ci

COPY . ./

RUN npm run build

FROM node:$NODE_VERSION-alpine AS production

WORKDIR /app

COPY --from=development /app/node_modules /app/node_modules
COPY --from=development /app/dist /app/dist/
COPY --from=development /app/.env /app/.env

EXPOSE 3000

CMD [ "node", "dist/main.js" ]
