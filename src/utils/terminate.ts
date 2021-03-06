import { getLogger } from './logger'

const log = getLogger(__dirname, __filename)

function terminate(code: number, reason: any): any {
  return (error: any, p: any): any => {
    const params: any = { code, reason }

    if (error) {
      params.error = error
      params.message = error.message
      params.stack = error.stack
    }

    if (p) {
      params.promise = p
    }

    log.info({ message: params })

    if (code === 0) {
      process.exit(code)
    }

    setTimeout((_) => { process.exit(code) }, 500).unref()
  }
}

export default terminate
