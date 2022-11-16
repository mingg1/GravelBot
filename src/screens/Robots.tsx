import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
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
import StatusButton from '../components/StatusOptions';
import { setCurrentRobot } from '../redux/slices/robotSlice';
import { AppDispatch } from '../redux/store';
import { RobotStatus } from '../types';

type RootStackParamList = {
  Robots?: { status: RobotStatus };
};

type RobotsScreenProps = BottomTabScreenProps<RootStackParamList, 'Robots'>;

const data = [
  {
    id: 1,
    name: 'GravelBot 1',
    stauts: RobotStatus.Available,
    battery: 65,
    storage: 100,
    message: 'Ready to use',
  },
];

const Robots = ({ route: { params } }: RobotsScreenProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [selected, setSelected] = useState(
    params?.status || RobotStatus.Available
  );
  const [robotList, setRobotList] = useState(
    data.filter((robot) => robot.stauts === selected)
  );
  const isSelected = (status: string | undefined) => selected === status;
  const length = robotList.length;
  const navigation = useNavigation<StackNavigationProp<any>>();

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
        {Object.keys(RobotStatus).map((status) => (
          <StatusButton<RobotStatus>
            key={status}
            status={status}
            setSelected={(status) => {
              setSelected(status);
              setRobotList(() =>
                data.filter((robot) => robot.stauts === status)
              );
            }}
            isSelected={isSelected(status)}
          />
        ))}
      </HStack>
      <Heading>{`${selected} robot${
        length === 1 ? '' : 's'
      } (${length}) `}</Heading>
      <FlatList
        data={robotList}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              //@ts-ignore
              dispatch(setCurrentRobot(item));
              navigation.navigate('RobotInfo', {
                screen: 'Robot Info',
              });
            }}
          >
            <Box my={4} p={4} borderRadius={12} backgroundColor="white">
              <Heading size="md">{item.name}</Heading>
              <Text fontSize="md">{item.battery}%</Text>
              <Divider />
              <Text>{item.message}</Text>
            </Box>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </VStack>
  );
};

export default Robots;
