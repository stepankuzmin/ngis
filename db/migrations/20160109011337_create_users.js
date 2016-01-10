
exports.up = function up(knex) {
  return knex.schema.createTable('users', table => {
    table.uuid('id').defaultTo(knex.raw('gen_random_uuid()'));
    table.string('email').notNullable();
    table.string('encrypted_password').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function down(knex) {
  return knex.schema.dropTable('users');
};
