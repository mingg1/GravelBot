import { Button } from 'native-base';
import { Dimensions } from 'react-native';
import NavBackButton from '../components/buttons/NavBackButton';
import MapView from '../components/Map';

const { height } = Dimensions.get('window');

const Map = ({ navigation, route: { params } }) => {
  return (
    <>
      <MapView height={height} onPressActivated={params.pointer} />
      <NavBackButton
        navigation={navigation}
        style={{ position: 'absolute', left: 0, top: 60 }}
        display="block"
      />
    </>
  );
};

export default Map;
