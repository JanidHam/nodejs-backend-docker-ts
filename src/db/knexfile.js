const path = require('path')

module.exports = {
  development: {
    client: 'mysql',
    useNullAsDefault: true,
    connection: {
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      port: process.env.DB_PORT,
      charset: 'utf8'
    },
    migrations: {
      directory: path.join(__dirname, './migrations'),
    },
    debug: true,
    seeds: {
      directory: path.join(__dirname, './seeds')
    }
  },

  test: {
    client: 'mysql',
    useNullAsDefault: true,
    connection: {
      host: 'localhost',
      database: 'nodejsapi_test',
      user: 'root',
      password: 'root',
      charset: 'utf8'
    },
    migrations: {
      directory: path.join(__dirname, './migrations'),
    },
    seeds: {
      directory: path.join(__dirname, './seeds/test')
    }
  },

  production: {
    client: 'mysql',
    useNullAsDefault: true,
    connection: {
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      port: process.env.DB_PORT,
      charset: 'utf8'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: path.join(__dirname, './migrations'),
    },
    seeds: {
      directory: path.join(__dirname, './seeds/prod')
    }
  }
}
