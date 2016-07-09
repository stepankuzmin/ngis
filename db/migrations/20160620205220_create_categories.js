
exports.up = (knex) =>
  knex.schema.withSchema('public').createTableIfNotExists('categories', table => {
    table.string('category_key').primary().notNullable();
    table.string('name').notNullable();
  });

exports.down = (knex) =>
  knex.schema.withSchema('public').dropTableIfExists('categories');
