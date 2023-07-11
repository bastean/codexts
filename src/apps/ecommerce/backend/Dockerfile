FROM node:lts-alpine AS production

ENV NODE_ENV production

WORKDIR /app

COPY build ./

RUN npm i --omit=dev

CMD [ "npm", "start" ]
