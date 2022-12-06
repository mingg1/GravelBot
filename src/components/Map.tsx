import { useEffect, useState } from 'react';
import { Dimensions, Image, Platform } from 'react-native';
import { Box, Button, Container, HStack, Text } from 'native-base';
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
//@ts-ignore
import markerIcon from '../../assets/marker.png';
//@ts-ignore
import robotLocationIcon from '../../assets/robot-location-marker.png';
import * as geolib from 'geolib';
import * as Location from 'expo-location';
import { formatArea } from '../helper';

interface MapProps {
  height: number;
  pointerEvents?: 'box-none' | 'none' | 'box-only' | 'auto' | undefined;
  onPressActivated?: boolean;
  polygon?: LatLng[];
  editMode?: boolean;
}

const { width } = Dimensions.get('window');

const Map = ({
  height,
  pointerEvents,
  onPressActivated,
  polygon,
  editMode,
}: MapProps) => {
  const [polygonCoordinates, setPolygonCoordinates] = useState<LatLng[]>(
    polygon || []
  );
  const [initLocation, setInitLocation] = useState({
    latitude: 60.22400378514987,
    longitude: 24.758655525329527,
  });
  useEffect(() => {
    (async () => {
      /* @hide */
      if (Platform.OS === 'android') {
        console.log(
          'Oops, this will not work on Snack in an Android Emulator. Try it on your device!'
        );
        return;
      }
      /* @end */
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync({});
      setInitLocation({ latitude, longitude });
      console.log(initLocation);
    })();
  }, []);

  const [showModal, setShowModal] = useState(false);
  const {
    workingAreas: { workingAreas },
  } = useSelector((state: RootState) => state);

  return (
    <>
      <MapView
        pointerEvents={pointerEvents}
        onPress={({ nativeEvent: { coordinate } }) => {
          if (onPressActivated) {
            setPolygonCoordinates((prev) => {
              // const newCoordinates = [...prev, coordinate];
              // const bounds = geolib.getBounds(newCoordinates);
              // console.log(bounds);

              return [...prev, coordinate];
            });
          }
        }}
        showsUserLocation={true}
        style={{
          alignSelf: 'stretch',
          height,
          position: 'relative',
          borderColor: '#c9c9c9',
          borderWidth: 0.5,
          borderRadius: 5,
        }}
        mapType={Platform.OS == 'android' ? 'none' : 'standard'}
        initialRegion={{
          ...initLocation,
          latitudeDelta: 0.0015,
          longitudeDelta: 0.0024,
        }}
      >
        {workingAreas.map((area, index) => {
          return (
            <Container key={index}>
              <Polygon
                coordinates={area.coordinates}
                fillColor="#43b67b85"
                strokeColor="green"
                onPress={({ nativeEvent: { coordinate } }) => {
                  //  marker?.current?.showCallout();
                  console.log(coordinate);
                  //console.log(marker?.current?.props.coordinate);
                }}
              />
              {area.coordinates?.map((coordinate, i) => (
                <Marker
                  key={i}
                  anchor={{ x: 0.5, y: 0.5 }}
                  coordinate={coordinate}
                  draggable
                  image={{
                    uri: Image.resolveAssetSource(markerIcon).uri,
                  }}
                  onPress={({ nativeEvent: { coordinate } }) => {
                    console.log(coordinate);

                    console.log(area.coordinates);
                  }}
                  onDragEnd={({ nativeEvent: { coordinate } }) => {
                    console.log(coordinate);
                  }}
                >
                  <Callout>
                    <CalloutSubview>
                      <Text>{area.name}</Text>
                      <Text>{area.description}</Text>
                    </CalloutSubview>
                  </Callout>
                </Marker>
              ))}
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
        {polygonCoordinates?.map((coordinate, i) => (
          <Marker
            key={i}
            anchor={{ x: 0.5, y: 0.5 }}
            coordinate={coordinate}
            draggable
            image={{
              uri: Image.resolveAssetSource(markerIcon).uri,
            }}
            onDragEnd={({ nativeEvent: { coordinate } }) => {
              console.log(coordinate);
              console.log(polygonCoordinates);
            }}
          />
        ))}
        <Marker
          image={{ uri: Image.resolveAssetSource(robotLocationIcon).uri }}
          coordinate={{
            latitude: 60.22400378514987,
            longitude: 24.758655525329527,
          }}
          title="GravelBot 1"
        />
      </MapView>
      {polygonCoordinates.length >= 3 && (
        <Box
          backgroundColor="#7474743d"
          style={{
            position: 'absolute',
            bottom: '16%',
            left: width / 2,
            transform: [{ translateX: -width / 3 }],
          }}
          py={2}
          px={6}
        >
          <Text fontWeight={600} fontSize="lg">
            Selected area:{' '}
            {formatArea(geolib.getAreaOfPolygon(polygonCoordinates))}
          </Text>
        </Box>
      )}
      <HStack
        style={{ position: 'absolute', bottom: 80, left: '18%' }}
        space={8}
      >
        <Button
          backgroundColor="orange.500"
          onPress={() => setPolygonCoordinates([])}
          _text={{ fontSize: 'lg', fontWeight: 600 }}
          display={polygonCoordinates.length > 0 ? 'block' : 'none'}
        >
          Reset area
        </Button>
        <Button
          backgroundColor="orange.500"
          _text={{ fontSize: 'lg', fontWeight: 600 }}
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
      {/* <IconButton
        size="lg"
        variant="solid"
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '8%',
        }}
        display="block"
        icon={
          <Icon
            as={MaterialIcons}
            name="my-location"
            onPress={() => {
              console.log(navigation);
            }}
          />
        }
      /> */}
    </>
  );
};

export default Map;
