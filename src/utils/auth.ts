import * as jwt from 'jsonwebtoken'

const bcrypt = require('bcrypt')
const saltRounds = 10

import { authConfig } from '../config'

/**
 * Crea un json web token válido.
 * @param  {any} payload
 * @return {Promise<any>} token
 */
const signToken = (payload: any): Promise<string> => {
  return new Promise((resolve, reject) => {
    const opts = { expiresIn: authConfig.expiresIn }
    jwt.sign(payload, authConfig.secret, opts, (err: any, token: string) => {
      if (err) return reject(err)

      return resolve(token)
    })
  })
}

const securePassword = (password: string): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    try {
      const hash = await bcrypt.hash(password, saltRounds)

      return resolve(hash)
    } catch (error) {
      return reject(error)
    }
  })
}

const verifyPassword = (password: string, hashPassword: string): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    try {
      const match = await bcrypt.compare(password, hashPassword)

      return resolve(match)
    } catch (error) {
      return reject(error)
    }
  })
}

export {
  signToken,
  securePassword,
  verifyPassword,
}
