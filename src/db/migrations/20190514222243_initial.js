
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('user', table => {
      table.increments('id').primary();
      table.string('name', 60).notNullable();
      table.string('lastName', 60).nullable();
      table.string('avatar', 255).nullable();
      table.string('password', 60).notNullable();
      table.string('email', 80).unique().notNullable();
      table.date('birth').nullable();
      table.boolean('deleted').notNullable().default(false);
      table.biginteger('emailVerifiedAt').nullable();
      table.biginteger('createdAt').notNullable();
      table.biginteger('updatedAt').notNullable();
    })
    .createTable('oauth_access_token', table => {
      table.string('token', 255).primary();
      table.integer('userId').unsigned().references('id').inTable('user').notNullable();
      table.text('scopes').nullable();
      table.boolean('revoked').notNullable().default(false);
      table.datetime('expiresAt').nullable();
      table.biginteger('createdAt').notNullable();
      table.biginteger('updatedAt').notNullable();
    })
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('oauth_access_token')
    .dropTableIfExists('user');
};
