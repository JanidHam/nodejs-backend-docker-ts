import ParentModel from './ParentModel'
import { securePassword } from '../../utils/auth'

class User extends ParentModel {
  readonly id!: number
  name: string
  lastName: string
  avatar: string
  password: string
  email: string
  birth: Date
  emailVerifiedAt: boolean
  deleted: boolean
  createdAt?: Date
  updatedAt?: Date

  static tableName = 'user'

  static jsonSchema = {
    type: 'object',
    required: ['name', 'password', 'email'],

    properties: {
      id: { type: 'integer' },
      name: { type: 'string', minLength: 1, maxLength: 60 },
      lastName: { type: 'string', minLength: 1, maxLength: 60 },
      avatar: { type: 'string', minLength: 1, maxLength: 255 },
      password: { type: 'string', minLength: 1, maxLength: 60 },
      email: { type: 'string', minLength: 1, maxLength: 80 },
      birth: { type: 'string', minLength: 1, maxLength: 120 },
      emailVerifiedAt: { type: 'boolean' },
      deleted: { type: 'boolean' },
    },
  }

  // Where to look for models classes.
  static modelPaths = [__dirname]

  static login(email: string, password: string): Promise<User> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await User.query()
          .select('id', 'name', 'lastName', 'password')
          .where('email', email)
          .limit(1).first()

        return resolve(user)
      } catch (error) {
        return reject(error)
      }
    })
  }

  static createUser(userData: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await User.query()
          .insert(userData)
          .pick(['id', 'name', 'lastName', 'password'])

        return resolve(user)
      } catch (error) {
        error.message = handleErrorCreateUser(error)

        return reject(error)
      }
    })
  }

  async $beforeInsert() {
    this.password = await securePassword(this.password)
    this.createdAt = new Date()
    this.updatedAt = new Date()
  }
}

function handleErrorCreateUser(error: any): string | null {
  const { code, sqlMessage, message } = error

  if (code !== 'ER_DUP_ENTRY') return message

  if (sqlMessage.includes('user_email_unique')) {
    return 'El correo ya fue usado, prueba con otro.'
  }

  return message ? message : 'Error al crear el usuario'
}

export default User
