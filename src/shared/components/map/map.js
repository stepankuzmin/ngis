import React from 'react';
import MapGL from 'react-map-gl';

export class Map extends React.Component {
  render() {
    return <MapGL width={400}
                  height={400}
                  latitude={37.7577}
                  longitude={-122.4376}
                  zoom={8} />;
  }
}
