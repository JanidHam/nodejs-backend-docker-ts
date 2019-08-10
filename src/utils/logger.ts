import * as path from 'path'
import * as uuid from 'uuid'
import * as morgan from 'morgan'
import * as through from 'through2'
import chalk from 'chalk'

import config from './config'

const bole = require('bole')
const streamFile = require('stream-file-archive')

const log = getLogger(__dirname, __filename)
const customMorgan = morgan(middleware)

const levels: any = {
  info: chalk.green,
  error: chalk.red,
  warn: chalk.yellow,
  debug: chalk.magenta,
}

const rotator = streamFile({
  path: `logs/${config.name}-${config.version}-%Y-%m-%d.log`,
  symlink: 'logs/current.log',
  compress: true,
})

const formatter = through((chunk, _, callback) => {
  try {
    const chunkJSON = JSON.parse(chunk)
    const { level, name } = chunkJSON
    const color = levels[level]
    let { id, message } = chunkJSON

    id = id ? ` ${chalk.blue(id)} ` : ' '
    message = typeof message === 'object' ? JSON.stringify(message, null, 2) : message

    console.log(`${color(level)}${id}(${chalk.cyan(name)}) ${message}`)

    callback(null, chunk)
  } catch (err) {
    callback(err)
  }
})

bole.output([
  {
    level: process.env.DEBUG ? 'debug' : 'info',
    stream: formatter,
  },
  {
    level: process.env.DEBUG ? 'debug' : 'info',
    stream: rotator,
  },
])

function getLogger(...names: string[]) {
  const name = names.map(name => path.basename(name, '.js')).join(path.sep)
  return bole(name)
}

const logHandler = (req: any, res: any, next: any) => {
  req.id = uuid.v4()
  customMorgan(req, res, next)
}

function middleware(tokens: any, req: any, res: any) {
  const id = req.id
  const { method, url, status } = tokens

  const message = `
  ${method(req, res)} ${url(req, res)} ${status(req, res)} - ${tokens['response-time'](req, res)} ms
  `

  log.info({ id, message })

  return ''
}

export { getLogger, logHandler }
