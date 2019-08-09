class Forbidden extends Error {
  status: number

  constructor (...args: any[]) {
    super(...args)
    this.name = this.constructor.name
    this.status = 403
    Error.captureStackTrace(this, Forbidden)
  }
}

export default Forbidden
