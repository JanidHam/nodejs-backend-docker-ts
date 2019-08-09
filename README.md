# nodejs-api-docker-ts

> Boilerplate for create a Node.js API write in typescript include docker-compose for development mode and a Dockerfile to build production image.

## Build Setup

``` bash
# install dependencies
npm install

# serve watching changes in src at localhost:3000
npm run dev
```

## Build Setup with docker

``` bash
# install dependencies
npm install

# serve watching changes in src at localhost:3000
docker-compose up
```

> ### To change Database conection go to file `src/db/index.ts`

``` js
knexFile.development.connection.host = 'yourhost'
knexFile.development.connection.database = 'yourdatabase'
knexFile.development.connection.user = 'youruser'
knexFile.development.connection.password = 'yourpassword'
```

## Run test

``` bash
# install dependencies
npm install

# run all test in `src/test`
npm run test
```

## Throubleshoting

> ### Before running the app in development mode without docker create the database with the name you set in the `src/db/Knexfile.js`

> ### Before running the **tests** create the database with the name you set in the `src/db/Knexfile.js`

## Make routes

> ### Just create new file inside the `src/api` folder. The server will create a new route with the giving file name **`ex: src/api/products.js`**
> ### now you can curl `http://localhost:${runningPort}/api/products`



## Make routes protected

``` ts
import { isLoggingIn } from '${relativeRoute}/middlewares/auth'

/*
  In the init method you can create routes, to make a route protected just add the `isLoggingIn` middleware in the first position.
*/

init() {
  this.router.get('/me', isLogginIn, this.me)
}
```