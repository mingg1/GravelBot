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
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { TouchableOpacity } from 'react-native';
import StatusButton from '../components/StatusOptions';
import useLocation from '../hooks/useLocation';
import { setCurrentRobot } from '../redux/slices/robotSlice';
import { RobotStatus } from '../types';
import { useSelector } from 'react-redux';

type RootStackParamList = {
  Robots?: { status: RobotStatus };
};

type RobotsScreenProps = BottomTabScreenProps<RootStackParamList, 'Robots'>;

const Robots = ({ route: { params } }: RobotsScreenProps) => {
  const {
    robots: { robots },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<AppDispatch>();

  const [selected, setSelected] = useState(
    params?.status || RobotStatus.Available
  );
  const [robotList, setRobotList] = useState(
    robots.filter((robot) => robot.status === selected)
  );
  const length = robotList.length;
  const navigation = useNavigation<StackNavigationProp<any>>();
  const isSelected = (status: string | undefined) => selected === status;
  const locations = robots.map((robot) =>
    useLocation(robot.location.latitude, robot.location.longitude)
  );

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
                robots.filter((robot) => robot.status === status)
              );
            }}
            isSelected={isSelected(status)}
          />
        ))}
      </HStack>
      <Heading>{`${selected} robot${
        length === 1 ? '' : 's'
      } (${length})`}</Heading>
      <FlatList
        data={robotList}
        renderItem={({ item }) => {
          const { suburb, city } = locations[item.id - 1].location.address;
          return (
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
                <Text fontSize="md">battery: {item.battery}%</Text>
                <Text fontSize="md">
                  location:{suburb}, {city}
                </Text>
                <Text fontSize="md">gravel filled: {item.storage}%</Text>
                <Divider />
                <Text>{item.message}</Text>
              </Box>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.id.toString()}
      />
    </VStack>
  );
};

export default Robots;
