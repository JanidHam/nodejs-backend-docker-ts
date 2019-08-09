const authConfig = {
  secret: process.env.TOKEN_SECRET || 'qwertyuiopasdfghjklzxcvbnm123456',
  expiresIn: '1m',
}

export {
  authConfig,
}
