/* @flow */

import { dissoc } from 'ramda';

export async function index(ctx: Object) {
  const { knex } = ctx;
  const layerKey = ctx.params.layer_key;

  const rows = await knex.withSchema('data')
    .select('*', knex.raw('st_asgeojson(geometry) as geometry'))
    .from(layerKey);

  const features = rows.map(row => ({
    type: 'Feature',
    id: row.id,
    properties: dissoc('geometry', row),
    geometry: JSON.parse(row.geometry)
  }));

  ctx.body = { type: 'FeatureCollection', features };
}
