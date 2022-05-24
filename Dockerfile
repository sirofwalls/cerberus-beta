FROM node:16.14.2-alpine3.15

WORKDIR /usr/nodeapp

COPY ./ ./

RUN npm install

ENTRYPOINT ["npm","start"]
