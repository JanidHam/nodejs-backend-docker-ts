import { Router, Request, Response, NextFunction } from 'express'

import OAuth from '@db/models/OAuth'
import { isLogginIn } from '@middlewares/auth'
import { loginUser, signUpUser } from '@auth/passport'

export class AuthRoutes {
  public router: Router

  /**
   * Initialize the Routes
   */
  constructor() {
    this.router = Router()
    this.init()
  }

  private me = async (req: Request, res: Response) => {
    const { user } = req

    return res.status(200).json({ user })
  }

  private logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user } = req

      await OAuth.revokeToken(user.token)

      return res.status(200).json({ message: 'ok' })
    } catch (error) {
      return next(error)
    }
  }

  private login = async (req: Request, res: Response) => {
    const { user, token } = req.body

    return res.status(200).json({ user, token })
  }

  private signup = async (req: Request, res: Response) => {
    const { user, token } = req.body

    return res.status(201).json({ user, token })
  }

  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init() {
    this.router.get('/me', isLogginIn, this.me)
    this.router.post('/logout', isLogginIn, this.logout)
    this.router.post('/login', loginUser, this.login)
    this.router.post('/signup', signUpUser, this.signup)
  }

}

// Crea uns instancia de las rutas y exporta su Express.Router configurado
const routes = new AuthRoutes()
export default routes.router
