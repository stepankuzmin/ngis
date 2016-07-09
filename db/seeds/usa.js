const fs = require('fs');
const data = JSON.parse(fs.readFileSync(`${__dirname}/data/usa.geojson`));

exports.seed = (knex, Promise) =>
  Promise.all([
    knex.withSchema('public').insert({
      layer_key: 'usa',
      name: 'United States of Amercia',
      geometry_type: 'Polygon',
      styles: JSON.stringify([{
        type: 'fill',
        paint: {
          'fill-color': '#666',
          'fill-opacity': 0.5
        }
      }])
    }).into('layers'),
    knex.schema.withSchema('data').createTableIfNotExists('usa', table => {
      table.increments();
      table.string('name').notNullable();
      table.specificType('geometry', 'geometry(Polygon, 4326)').notNullable();
    }).then(() =>
      knex.withSchema('data').insert(
        data.features.map(feature => ({
          name: feature.properties.name,
          geometry: knex.raw(
            `st_setsrid(st_geomfromgeojson('${JSON.stringify(feature.geometry)}'), 4326)`
          )
        }))
      ).into('usa')
    )
  ]);
