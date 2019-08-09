class NotFound extends Error {
  status: number

  constructor (...args: any[]) {
    super(...args)
    this.name = this.constructor.name
    this.status = 404
    Error.captureStackTrace(this, NotFound)
  }
}

export default NotFound
