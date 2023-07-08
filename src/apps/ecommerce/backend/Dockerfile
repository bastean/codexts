FROM node:lts-alpine AS deploy

WORKDIR /app

COPY build ./

RUN npm i --omit=dev

CMD [ "npm", "start" ]
