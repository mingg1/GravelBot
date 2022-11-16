import { useRef, useState } from 'react';
import { Platform } from 'react-native';
import { Button, Container, HStack, Text } from 'native-base';
import MapView, {
  Callout,
  CalloutSubview,
  LatLng,
  Marker,
  Polygon,
  Polyline,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import ModalForm from './Modal';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';

interface MapProps {
  height: number;
  pointerEvents?: 'box-none' | 'none' | 'box-only' | 'auto' | undefined;
  onPressActivated?: boolean;
}

const Map = ({ height, pointerEvents, onPressActivated }: MapProps) => {
  const [polygonCoordinates, setPolygonCoordinates] = useState<LatLng[]>([]);
  const [showModal, setShowModal] = useState(false);
  const {
    workingAreas: { workingAreas },
  } = useSelector((state: RootState) => state);
  const marker = useRef<Marker | null>(null);
  return (
    <>
      <MapView
        pointerEvents={pointerEvents}
        onPress={({ nativeEvent: { coordinate } }) => {
          if (onPressActivated) {
            setPolygonCoordinates((prev) => [...prev, coordinate]);
          }
        }}
        showsUserLocation={true}
        style={{
          alignSelf: 'stretch',
          height,
          position: 'relative',
        }}
        mapType={Platform.OS == 'android' ? 'none' : 'standard'}
        initialRegion={{
          latitude: 60.22400378514987,
          longitude: 24.758655525329527,
          latitudeDelta: 0.0015,
          longitudeDelta: 0.0024,
        }}
      >
        {workingAreas.map((area, index) => {
          return (
            <Container key={index}>
              <Polygon
                coordinates={area.area}
                fillColor="#43b67b85"
                strokeColor="green"
                onPress={({ nativeEvent: { coordinate } }) => {
                  marker?.current?.showCallout();
                  console.log(coordinate);
                  console.log(marker?.current?.props.coordinate);
                }}
              />
              <Marker
                ref={marker}
                coordinate={area.area[0]}
                draggable
                onDrag={({ nativeEvent: { coordinate } }) => {
                  console.log(coordinate);
                  console.log(polygonCoordinates);
                }}
              >
                <Callout>
                  <CalloutSubview>
                    <Text>{area.name}</Text>
                    <Text>{area.description}</Text>
                  </CalloutSubview>
                </Callout>
              </Marker>
            </Container>
          );
        })}
        <Polyline
          coordinates={polygonCoordinates}
          strokeColor={
            polygonCoordinates.length === 2 ? 'green' : 'transparent'
          }
        />
        <Polygon
          coordinates={polygonCoordinates}
          fillColor="#43b67b85"
          strokeColor="green"
        />
        <Marker
          coordinate={{
            latitude: 60.22400378514987,
            longitude: 24.758655525329527,
          }}
          title="GravelBot 1"
        />
      </MapView>

      <HStack
        style={{ position: 'absolute', bottom: 80, left: '33%' }}
        space={8}
      >
        <Button
          onPress={() => setPolygonCoordinates([])}
          display={polygonCoordinates.length > 0 ? 'block' : 'none'}
        >
          Reset area
        </Button>
        <Button
          onPress={() => setShowModal(true)}
          display={polygonCoordinates.length >= 3 ? 'block' : 'none'}
        >
          Save area
        </Button>
      </HStack>
      <ModalForm
        showModal={showModal}
        setShowModal={setShowModal}
        coordinates={polygonCoordinates}
      />
    </>
  );
};

export default Map;
