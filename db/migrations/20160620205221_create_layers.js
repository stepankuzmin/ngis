
exports.up = (knex) =>
  knex.schema.withSchema('public').createTableIfNotExists('layers', table => {
    table.string('layer_key').primary().notNullable();
    table.string('category_key').references('category_key').inTable('categories');
    table.string('name').notNullable();
    table.integer('order').notNullable().defaultTo(0);
    table.jsonb('styles').notNullable();
    table.enu('geometry_type', [
      'Point', 'MultiPoint',
      'LineString', 'MultiLineString',
      'Polygon', 'MultiPolygon'
    ]).notNullable();
  });

exports.down = (knex) =>
  knex.schema.withSchema('public').dropTableIfExists('layers');
