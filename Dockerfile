FROM node:18-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app


USER app

WORKDIR /home/node/app

COPY --chown=app:node package*.json .

RUN npm install

COPY --chown=app:node . .


EXPOSE 8080

CMD [ "node", "dist/index.js" ]