import { useNavigation } from '@react-navigation/native';
import { Box, Divider, Heading, ScrollView, Text, useToast } from 'native-base';
import { useState } from 'react';
import MapView, { Polygon } from 'react-native-maps';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import ContentButton from '../components/ContentButton';
import ModalForm from '../components/Modal';
import { deleteWorkingArea } from '../redux/slices/workingAreaSlice';
import { AppDispatch, RootState } from '../redux/store';

const AreaInfo = () => {
  const navigation = useNavigation();
  const {
    workingAreas: { workingArea },
  } = useSelector((state: RootState) => state);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const toast = useToast();
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
        <Heading size="md">{workingArea.name}</Heading>
        <Divider />
        <Text fontSize="md">{workingArea.description}</Text>
        <Text fontSize="md">Status: {workingArea.status}</Text>
        <MapView
          style={{ height: 300 }}
          region={{
            latitude: workingArea.area[0].latitude,
            longitude: workingArea.area[0].longitude,
            latitudeDelta: 0.0013,
            longitudeDelta: 0.0032,
          }}
        >
          <Polygon
            fillColor="#43b67b85"
            strokeColor="green"
            coordinates={workingArea.area}
          />
        </MapView>
        <ContentButton
          onPress={() => {
            //@ts-ignore
            navigation.navigate('Map', {
              name: 'Map',
              params: { item: workingArea },
            });
          }}
          text="Edit area"
        />
        <ContentButton
          text="Edit information"
          onPress={() => setShowModal(true)}
        />
        <ContentButton
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
          coordinates={workingArea.area}
          update={true}
        />
      </Box>
    </ScrollView>
  );
};

export default AreaInfo;
