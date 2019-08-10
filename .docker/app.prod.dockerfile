# Establece la imagen base
FROM node:10.16.1-alpine as builder

RUN apk --no-cache add --virtual native-deps \
  g++ gcc libgcc libstdc++ linux-headers autoconf automake make nasm python git && \
  npm install --quiet node-gyp -g

# Información de Metadata
LABEL name="Node.js API with docker"
LABEL maintainer="janid.ham20@gmail.com"
LABEL version="1.0"

COPY ./package*.json /usr/src/

WORKDIR /usr/src

RUN npm install --only=production

COPY [".", "/usr/src/"]

RUN npm install --only=development

RUN npm run build

# Productive image install node
FROM node:10.16.1-alpine

RUN apk --no-cache add --virtual native-deps \
  g++ gcc libgcc libstdc++ linux-headers autoconf automake make nasm python git && \
  npm install --quiet node-gyp -g

COPY ./package*.json /nodejs-app/

WORKDIR /nodejs-app

RUN npm install --only=production

COPY --from=builder ["/usr/src/dist", "/nodejs-app/dist"]

EXPOSE 3000

CMD ["node", "dist/app.js"]
