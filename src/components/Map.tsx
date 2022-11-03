import { Center } from 'native-base';
import { Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const Map = () => {
  return (
    <MapView
      style={{ alignSelf: 'stretch', height: 300 }}
      mapType={Platform.OS == 'android' ? 'none' : 'standard'}
      region={{
        latitude: 60.22400378514987,
        longitude: 24.758655525329527,
        latitudeDelta: 0.0015,
        longitudeDelta: 0.0024,
      }}
    >
      <Marker
        coordinate={{
          latitude: 60.22400378514987,
          longitude: 24.758655525329527,
        }}
        title="GravelBot"
      />
    </MapView>
  );
};
export default Map;
