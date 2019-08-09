const faker = require('faker')

const loginUser = () => {
  return {
    email: 'janid.ham20@gmail.com',
    password: 'test',
  }
}

const createUser = () => {
  return {
    name: faker.name.firstName(),
    lastName: faker.name.lastName(),
    password: faker.internet.password(),
    email: faker.internet.exampleEmail(),
  }
}

export {
  loginUser,
  createUser,
}
