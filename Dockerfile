FROM node:22.12-alpine AS release

ENV NODE_ENV=production

WORKDIR /app

COPY . /app

RUN npm ci --ignore-scripts --omit-dev

ENTRYPOINT ["node", "main.js"]