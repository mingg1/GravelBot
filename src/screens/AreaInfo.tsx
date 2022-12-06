import { useNavigation } from '@react-navigation/native';
import {
  Box,
  Divider,
  Heading,
  ScrollView,
  Text,
  useToast,
  VStack,
} from 'native-base';
import { useState } from 'react';
import MapView, { Polygon } from 'react-native-maps';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import ContentButton from '../components/buttons/ContentButton';
import ModalForm from '../components/Modal';
import { deleteWorkingArea } from '../redux/slices/workingAreaSlice';
import { AppDispatch, RootState } from '../redux/store';
import * as geolib from 'geolib';
import { formatArea, formatDate, parseDate } from '../helper';
import HistoryStatusInfo from '../components/HistoryStatusInfo';
import useLocation from '../hooks/useLocation';

const AreaInfo = () => {
  const navigation = useNavigation();
  const {
    workingAreas: { workingArea },
  } = useSelector((state: RootState) => state);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const toast = useToast();
  const {
    location: {
      address: { road, house_number, city },
    },
  } = useLocation(
    workingArea.coordinates[0].latitude,
    workingArea.coordinates[0].longitude
  );

  return (
    <ScrollView>
      <Box
        width="85%"
        marginX="auto"
        my={12}
        px={8}
        py={10}
        borderTopRadius={16}
        backgroundColor="white"
      >
        <Heading size="xl">{workingArea.name}</Heading>
        <Divider my={2} />
        <VStack space={2} mb={4}>
          <Heading fontSize="md" color="gray.500">
            Address
          </Heading>
          <Text fontSize="lg" fontWeight={600}>
            {road} {house_number || ''}, {city}
          </Text>
        </VStack>
        <VStack space={2} mb={4}>
          <Heading fontSize="md" color="gray.500">
            Description
          </Heading>
          <Text fontSize="lg" fontWeight={600}>
            {workingArea.description}
          </Text>
        </VStack>
        <VStack space={2} mb={4}>
          <Heading fontSize="md" color="gray.500">
            Status
          </Heading>
          <HistoryStatusInfo
            info={workingArea.status}
            bgColor="gray.500"
            fontSize="xs"
            position="flex-start"
          />
        </VStack>
        {workingArea.lastGraveled && (
          <VStack space={2} mb={4}>
            <Heading fontSize="md" color="gray.500">
              Last graveled
            </Heading>
            <Text fontSize="lg" fontWeight={600}>
              {formatDate(
                new Date(workingArea.lastGraveled),
                new Date(workingArea.lastGraveled)
              )}
            </Text>
          </VStack>
        )}
        <VStack space={2} mb={4}>
          <Heading fontSize="md" color="gray.500">
            Area
          </Heading>
          <Text fontSize="lg" fontWeight={600}>
            {formatArea(geolib.getAreaOfPolygon(workingArea.coordinates))}
          </Text>
        </VStack>
        <MapView
          pointerEvents="none"
          style={{ height: 300 }}
          region={{
            latitude: workingArea.coordinates[0].latitude,
            longitude: workingArea.coordinates[0].longitude,
            latitudeDelta: 0.0013,
            longitudeDelta: 0.0032,
          }}
        >
          <Polygon
            fillColor="#43b67b85"
            strokeColor="green"
            coordinates={workingArea.coordinates}
          />
        </MapView>
        {/* <ContentButton
          onPress={() => {
            //@ts-ignore
            navigation.navigate('Map', {
              name: 'Map',
              params: { item: workingArea },
            });
          }}
          text="Edit area"
        /> */}
        <ContentButton
          text="Edit information"
          onPress={() => setShowModal(true)}
        />
        <ContentButton
          bgColor="red.600"
          text="Delete area"
          onPress={() => {
            toast.show({
              title: 'Selected area has been deleted',
              placement: 'bottom',
            });
            navigation.goBack();
            dispatch(deleteWorkingArea({ id: workingArea.id }));
          }}
        />
        <ModalForm
          showModal={showModal}
          setShowModal={setShowModal}
          areaInfo={workingArea}
          coordinates={workingArea.coordinates}
          update={true}
        />
      </Box>
    </ScrollView>
  );
};

export default AreaInfo;
