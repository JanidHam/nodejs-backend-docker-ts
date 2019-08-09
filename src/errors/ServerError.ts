class ServerError extends Error {
  status: number

  constructor (...args: any[]) {
    super(...args)
    this.name = this.constructor.name
    this.status = 500
    Error.captureStackTrace(this, ServerError)
  }
}

export default ServerError
