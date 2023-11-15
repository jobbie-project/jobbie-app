FROM node:18.14-alpine AS base

# Create app directory
WORKDIR /usr/src/app

COPY . ./
RUN yarn install
RUN yarn build

EXPOSE 3000

ENV MODE=production

CMD node server.js