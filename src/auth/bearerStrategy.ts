import * as passportBearer from 'passport-http-bearer'

import OAuth from '@db/models/OAuth'

const bearerStrategy = new passportBearer.Strategy(async (token, done) => {
  try {
    const user = await OAuth.getUserByToken(token)

    if (!user) return done(null, false)

    user.token = token

    return done(null, user.toJSON())
  } catch (error) {
    return done(error, false)
  }
})

export default bearerStrategy
