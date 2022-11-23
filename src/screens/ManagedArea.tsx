import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import {
  Box,
  Divider,
  FlatList,
  Heading,
  HStack,
  Text,
  VStack,
} from 'native-base';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import StatusButton from '../components/StatusOptions';
import { setCurrentWorkingArea } from '../redux/slices/workingAreaSlice';
import { AppDispatch, RootState } from '../redux/store';
import { AreaStatus } from '../types';

type RootStackParamList = {
  'Managed Area'?: { status: AreaStatus };
};

type ManagedAreaProps = StackScreenProps<RootStackParamList, 'Managed Area'>;

const ManagedArea = ({ route: { params } }: ManagedAreaProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();
  const [selected, setSelected] = useState(
    params?.status || AreaStatus.Ungraveled
  );
  const {
    workingAreas: { workingAreas, workingArea },
  } = useSelector((state: RootState) => state);
  const isSelected = (status: string | undefined) => selected === status;
  return (
    <VStack width="90%" marginX="auto">
      <HStack
        my={8}
        p={4}
        borderRadius={12}
        backgroundColor="white"
        space={6}
        justifyContent="space-around"
      >
        {Object.keys(AreaStatus).map((status) => (
          <StatusButton<AreaStatus>
            key={status}
            status={status}
            setSelected={(status) => {
              setSelected(status);
            }}
            isSelected={isSelected(status)}
          />
        ))}
      </HStack>
      <Heading>{`${selected} area${
        workingAreas.filter((area) => area.status === selected).length === 1
          ? ''
          : 's'
      } (${
        workingAreas.filter((area) => area.status === selected).length
      }) `}</Heading>
      <FlatList
        data={workingAreas.filter((area) => area.status === selected)}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              dispatch(setCurrentWorkingArea(item));

              //@ts-ignore
              navigation.navigate('WorkingAreaInfo');
            }}
          >
            <Box my={4} p={4} borderRadius={12} backgroundColor="white">
              <Heading size="md">{item.name}</Heading>
              <Text fontSize="md">{item.description}</Text>
              {item.lastGraveled && (
                <Text fontSize="md">last graveled: {item.lastGraveled}</Text>
              )}
            </Box>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </VStack>
  );
};
export default ManagedArea;
