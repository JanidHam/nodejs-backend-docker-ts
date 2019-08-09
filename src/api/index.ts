import * as path from 'path'
import { getLogger } from '../utils'

const glob = require('glob')
const { promisify } = require('util')

const globRead = promisify(glob)
const log = getLogger(__dirname, __filename)

export default {
  initApi: (app: any) => globRead(`${__dirname}/**/*.*`)
    .then((files: any[]) => {
      files.forEach((file) => {
        const route = file.replace(`${__dirname}/`, '')
        const fileName = route.replace(/.(t|j)s/, '')

        if (fileName === 'index') return

        const pathFile = path.resolve(__dirname, fileName)
        // eslint-disable-next-line global-require
        const router = require(pathFile)

        app.use(`/api/${fileName}`, router.default)
        log.info(`API found @api/${fileName}`)
      })
    }).catch((err: any) => console.error(err)),
}
