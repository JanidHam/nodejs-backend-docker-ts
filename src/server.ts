import * as cors from 'cors'
import * as express from 'express'
import * as helmet from 'helmet'
import * as http from 'http'
import * as passport from 'passport'

import * as api from './api'
import { mError } from './middlewares'
import bearerStrategy from './auth/bearerStrategy'

import { getLogger, logHandler } from './utils'
import { deserializeUser, serializeUser } from './auth/passport'

export class Server {
  private app: express.Application
  private server: http.Server
  private port: string | number
  private log: any

  constructor() {
    this.port = process.env.PORT || 3000
    this.log = getLogger(__dirname, __filename)
    this.app = express()

    this.app
      .use(helmet())
      .use(cors())
      .use(express.json())
      .use(express.urlencoded({ extended: false }))
      .use(passport.initialize())
      .use(logHandler)

    passport.use(bearerStrategy)
    passport.deserializeUser(deserializeUser)
    passport.serializeUser(serializeUser)
  }

  private async registerApi() {
    await api.default.initApi(this.app)
  }

  public async start() {
    return new Promise(async (resolve, reject) => {
      try {
        await this.registerApi()

        this.app.use(mError)

        this.server = http.createServer(this.app)

        this.server.listen(this.port, () => {
          this.log.info(`Server listening on http://localhost:${this.port}`)
          return resolve(true)
        })
      } catch (error) {
        this.log.error(error.message)
        return reject(error)
      }
    })
  }

  public stop() {
    return new Promise(async (resolve, reject) => {
      try {
        if (!this.server) return resolve('No server is running.')

        await this.server.close()

        this.server.on('close', () => {
          return resolve(true)
        })
      } catch (error) {
        return reject(error)
      }
    })
  }

}

const server = new Server()
export default server
