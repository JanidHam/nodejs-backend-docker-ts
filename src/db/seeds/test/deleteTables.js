const faker = require('faker')
const utils = require('../../../utils')

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('oauth_access_token').del()
    .then(() => {
      return knex('user').del().then(async function () {
        return knex('user').insert({
          id: 1,
          name: 'Janid',
          lastName: 'Ham Delgado',
          email: 'janid.ham20@gmail.com',
          createdAt: new Date().getTime(),
          updatedAt: new Date().getTime(),
          password: await utils.auth.securePassword('test'),
        })
      })
    })
}
