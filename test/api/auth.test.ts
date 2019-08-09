import server from '../../src/server'
import db from '../../src/db'

import * as fixtures from '../fixtures'
import { instance } from '../config'

beforeAll(async () => {
  await db.migrate.latest()
  await db.seed.run()
  await server.start()
})

afterAll(async () => {
  await server.stop()
  await db.destroy()
})

describe('AUTH API methods', () => {

  it('LOGIN user', async () => {
    const body = fixtures.loginUser()
    const { status, data: { user, token } } = await instance.post('/api/auth/login', body)

    expect(status).toBe(200)
    expect(token).toBeTruthy()
    expect(user).toBeTruthy()
  })

  it('ME user UnAuthorized', async () => {
    try {
      const body = { email: 'test', password: 'test' }
      await instance.post('/api/auth/login', body)
    } catch (error) {
      const { response: { status } } = error
      expect(status).toBe(401)
    }
  })

  it('ME user', async () => {
    const body = fixtures.loginUser()
    const { status, data: { token } } = await instance.post('/api/auth/login', body)

    expect(status).toBe(200)
    expect(token).toBeTruthy()

    const opts = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const { data: { user } } = await instance.get('/api/auth/me', opts)
    expect(user).toBeTruthy()
  })

  it('LOGOUT user', async () => {
    const body = fixtures.loginUser()
    const { status, data: { token } } = await instance.post('/api/auth/login', body)

    expect(status).toBe(200)
    expect(token).toBeTruthy()

    const opts = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const respose = await instance.post('/api/auth/logout', {}, opts)

    expect(respose.status).toEqual(200)
    expect(respose.data.message).toEqual('ok')
  })

  it('SignUp user', async () => {
    const body = fixtures.createUser()
    const { status, data: { user } } = await instance.post('/api/auth/signup', body)

    expect(status).toBe(201)
    expect(user.name).toEqual(body.name)
    expect(user.lastName).toEqual(body.lastName)
  })
})
