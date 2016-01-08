
exports.up = function up(knex) {
  return knex.schema
    .createExtension('postgis')
    .createExtension('pgcrypto');
};

exports.down = function down(knex) {
  return knex.schema
    .dropExtension('postgis')
    .dropExtension('pgcrypto');
};
