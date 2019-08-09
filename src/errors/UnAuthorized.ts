class UnauthorizedRequest extends Error {
  status: number

  constructor (...args: any[]) {
    super(...args)
    this.name = this.constructor.name
    this.status = 401
    Error.captureStackTrace(this, UnauthorizedRequest)
  }
}

export default UnauthorizedRequest
