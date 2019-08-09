import { Router, Request, Response, NextFunction } from 'express'
import { isLogginIn } from '../middlewares/auth'

export class HelloRoutes {
  public router: Router

  /**
   * Initialize the Routes
   */
  constructor() {
    this.router = Router()
    this.init()
  }

  private get = async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({ hola: 'Hola 😄!' })
  }

  private getAuth = async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.user

    return res.status(200).json({ hola: `Hola ${name} from auth route 😄!` })
  }

  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init() {
    this.router.get('/', this.get)
    this.router.get(
      '/auth', isLogginIn, this.getAuth,
    )
  }

}

// Crea uns instancia de las rutas y exporta su Express.Router configurado
const routes = new HelloRoutes()
export default routes.router
