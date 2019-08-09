import { authenticate } from 'passport'

const isLogginIn = authenticate('bearer', { session: false })

export {
  isLogginIn,
}
