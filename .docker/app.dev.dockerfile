# Establece la imagen base
FROM node:10.16.1-alpine

RUN apk --no-cache add --virtual native-deps \
  g++ gcc libgcc libstdc++ linux-headers autoconf automake make nasm python git && \
  npm install --quiet node-gyp -g

# Información de Metadata
LABEL name="DEV - Node.js API in typescript with docker"
LABEL maintainer="janid.ham20@gmail.com"
LABEL version="1.0"

COPY ./package*.json /usr/src/

WORKDIR /usr/src

RUN npm install --only=production

COPY . /usr/src/

RUN npm install --only=development

EXPOSE 3000

CMD ["npm", "run", "dev"]
