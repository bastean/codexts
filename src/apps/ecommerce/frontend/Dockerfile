FROM node:lts-alpine AS build

WORKDIR /app

COPY . .

ARG BACKEND_URL

ENV VITE_BACKEND_URL=${BACKEND_URL}

RUN npm i \
    && npm run build

FROM node:lts-alpine AS deploy

WORKDIR /app

RUN rm -rf ./*

COPY --from=build app/package.json .

COPY --from=build app/build .

RUN npm i --omit=dev

CMD [ "node", "index" ]
