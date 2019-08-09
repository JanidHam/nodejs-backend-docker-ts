import * as Knex from 'knex'
import { Model } from 'objection'

const knexFile = require('./knexfile')

const { NODE_ENV, DB_HOST, DB_NAME, DB_USER, DB_PASS } = process.env

if (!DB_HOST || !DB_NAME || !DB_USER || !DB_PASS) {
  knexFile.development.connection.host = 'localhost'
  knexFile.development.connection.database = 'nodejsapi'
  knexFile.development.connection.user = 'root'
  knexFile.development.connection.password = 'root'
}

let knexConfig =  knexFile.development

if (NODE_ENV === 'production') knexConfig = knexFile.production
if (NODE_ENV === 'test') knexConfig = knexFile.test

const knex = Knex(knexConfig)

Model.knex(knex)

export default knex
