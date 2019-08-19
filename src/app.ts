const moduleAlias = require('module-alias')

moduleAlias.addAliases({
  '@root'  : __dirname,
  '@api': `${__dirname}/api`,
  '@db': `${__dirname}/db`,
  '@auth': `${__dirname}/auth`,
  '@utils': `${__dirname}/utils`,
  '@errors': `${__dirname}/errors`,
  '@middlewares': `${__dirname}/middlewares`,
})

import server from '@root/server'
import { terminate } from '@utils'

import db from '@db'

const initApp = async function initApp() {
  try {
    await db.migrate.latest()
    await db.seed.run()
    await server.start()
  } catch (err) {
    await db.migrate.rollback()
    terminate(1, 'initError')(err, err)
  }
}

initApp()

process.on('SIGINT', terminate(0, 'SIGINT'))
process.on('SIGTERM', terminate(0, 'SIGTERM'))
process.on('uncaughtException', terminate(1, 'uncaughtException'))
process.on('unhandledRejection', terminate(1, 'unhandledRejection'))
