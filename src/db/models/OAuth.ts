import { RelationMappings, Model } from 'objection'
import ParentModel from './ParentModel'

class OAuth extends ParentModel {
  readonly token!: string
  userId: number
  scopes: string
  revoked: boolean
  expiresAt: Date
  user?: any

  static tableName = 'oauth_access_token'

  static jsonSchema = {
    type: 'object',
    required: ['token', 'userId'],

    properties: {
      token: { type: 'string', minLength: 1, maxLength: 255 },
      userId: { type: 'integer' },
      scopes: { type: 'string', minLength: 1, maxLength: 255 },
      revoked: { type: 'boolean' },
      expiresAt: { type: 'string', minLength: 1, maxLength: 255 },
    },
  }

  // This object defines the relations to other models.
  static relationMappings: RelationMappings = {
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: 'User',
      filter: query => query.select('id', 'name', 'lastName').limit(1).first(),
      join: {
        from: 'user.id',
        to: 'oauth_access_token.userId',
      },
    },
  }

  // Where to look for models classes.
  static modelPaths = [__dirname]

  static insertToken(data: any): Promise<Boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!data.token) return reject('Token inválido.')

        const token = await OAuth.query()
          .where('token', data.token)
          .andWhere('revoked', false)
          .limit(1).first()

        if (token) return resolve(true)

        const oauth = await OAuth.query()
          .insert(data)

        if (!oauth) return reject('Hubo un error al guardar el token.')

        return resolve(true)
      } catch (error) {
        return reject(error)
      }
    })
  }

  static revokeToken(token: string): Promise<Boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const patched = await OAuth.query()
          .patch({ revoked: true })
          .where('token', token)
          .limit(1).first()

        if (!patched) return reject('Hubo un error al revocar el token.')

        return resolve(true)
      } catch (error) {
        return reject(error)
      }
    })
  }

  static getUserByToken(token: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const oauth = await OAuth.query()
          .allowEager('user')
          .eager('user')
          .where('token', token)
          .andWhere('revoked', false)
          .limit(1).first()

        if (!oauth) return resolve(false)

        return resolve(oauth.user)
      } catch (error) {
        return reject(error)
      }
    })
  }
}

export default OAuth
