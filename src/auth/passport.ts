import User from '../db/models/User'
import OAuth from '../db/models/OAuth'

import { signToken, verifyPassword } from '../utils/auth'
import { BadRequest, UnAuthorized, ServerError } from '../errors'

const serializeUser = (user: any, done: (error: any, user: any) => void) => {
  done(null, user)
}

const deserializeUser = (user: any, done: (error: any, user: any) => void) => {
  done(null, user)
}

const loginUser = async (req: any, res: any, next: any) => {
  try {
    const { email, password } = req.body

    if (!email || !password) return next(new UnAuthorized('Usuario o contraseña no coinciden.'))

    const user = await User.login(email, password)

    if (!user) return next(new UnAuthorized('Usuario o contraseña no coinciden.'))

    const match = await verifyPassword(password, user.password)

    if (!match) return next(new UnAuthorized('Usuario o contraseña no coinciden.'))

    delete user.password

    const token = await signToken(user.toJSON())

    const oauth = await OAuth.insertToken({ token, userId: user.id })

    if (!oauth) return next(new ServerError('Hubo un error al guardar el token.'))

    req.body.user = user
    req.body.token = token

    return next()
  } catch (error) {
    return next(error)
  }
}

const signUpUser = async (req: any, res: any, next: any) => {
  try {
    const user = await User.createUser(req.body)

    if (!user) return next(new BadRequest('Hubo un error al crear tu cuenta.'))

    const token = await signToken(user.toJSON())

    delete user.password

    req.body.user = user
    req.body.token = token

    return next()
  } catch (error) {
    return next(error)
  }
}

export {
  serializeUser,
  deserializeUser,
  loginUser,
  signUpUser,
}
