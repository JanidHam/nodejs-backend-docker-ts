class BadRequest extends Error {
  status: number

  constructor (...args: any[]) {
    super(...args)
    this.name = this.constructor.name
    this.status = 400
    Error.captureStackTrace(this, BadRequest)
  }
}

export default BadRequest
