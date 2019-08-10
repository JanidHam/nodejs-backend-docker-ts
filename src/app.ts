import 'module-alias/register'

import server from './server'
import { terminate } from '@utils'

import db from './db'

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
