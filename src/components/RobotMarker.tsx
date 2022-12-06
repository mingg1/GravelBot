import { Image } from 'react-native';
import { LatLng, Marker } from 'react-native-maps';
//@ts-ignore
import robotLocationIcon from '../../assets/robot-location-marker.png';

interface RobotMarkerProps {
  coordinate: LatLng;
}

const RobotMarker = ({ coordinate }: RobotMarkerProps) => (
  <Marker
    coordinate={coordinate}
    draggable
    image={{
      uri: Image.resolveAssetSource(robotLocationIcon).uri,
    }}
    onPress={({ nativeEvent: { coordinate } }) => {
      console.log(coordinate);
    }}
    onDragEnd={({ nativeEvent: { coordinate } }) => {
      console.log(coordinate);
    }}
  ></Marker>
);

export default RobotMarker;
