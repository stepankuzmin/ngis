
exports.up = function up(knex) {
  return knex.schema.createSchema('data');
};

exports.down = function down(knex) {
  return knex.schema.dropSchema('data');
};
