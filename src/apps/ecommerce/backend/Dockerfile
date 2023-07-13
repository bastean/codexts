FROM node:lts-alpine AS production

ENV NODE_ENV production

WORKDIR /app

COPY src/apps/ecommerce/backend/src ./src

COPY src/apps/ecommerce/backend/package.json .

COPY src/apps/ecommerce/backend/tsconfig.json .

COPY src/contexts/ecommerce ./src/contexts/ecommerce

RUN npm pkg set workspaces[]='src/contexts/ecommerce'

RUN npm i --omit=dev

CMD [ "npm", "start" ]
