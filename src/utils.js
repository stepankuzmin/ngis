/* @flow */

import * as co from 'co';

export const selectGeoJSON = co.wrap(
  function* selectFeatures(db, table: string) {
    const rows = yield db.select(db.raw(
      'id, kind, type, number, passport, long_name, st_asgeojson(geometry) as geometry'
    )).from(table);

    const results = rows || [];
    const features = results.map(row => ({
      type: 'Feature',
      id: row.id,
      properties: {
        id: row.id,
        kind: row.kind,
        type: row.type,
        number: row.number,
        passport: row.passport,
        long_name: row.long_name
      },
      geometry: JSON.parse(row.geometry)
    }));

    return { type: 'FeatureCollection', features };
  }
);
