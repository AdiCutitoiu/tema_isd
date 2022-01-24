import React from 'react';
import MapView, {Marker} from 'react-native-maps';
import {useLocations} from '../hooks';

export function MapScreen({
  position,
}: {
  position: {
    latitude: number;
    longitude: number;
  };
}) {
  const {locations} = useLocations();

  return (
    <MapView
      style={{flex: 1}}
      initialRegion={{
        ...position,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
      followsUserLocation
      showsUserLocation
      showsMyLocationButton={false}>
      {locations.map(pos => {
        return <Marker key={pos.id} coordinate={pos} title={pos.name} />;
      })}
    </MapView>
  );
}
