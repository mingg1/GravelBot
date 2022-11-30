import {
  Box,
  Divider,
  FlatList,
  Heading,
  HStack,
  Text,
  VStack,
} from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import StatusButton from '../components/StatusOptions';
import useLocation from '../hooks/useLocation';
import { setCurrentRobot } from '../redux/slices/robotSlice';
import { RobotStatus } from '../types';
import { useSelector } from 'react-redux';
import RobotStatusInfo from '../components/RobotStatusInfo';
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';

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

  useEffect(() => {
    if (params?.status) {
      setSelected(params.status);
      setRobotList(robots.filter((robot) => robot.status === selected));
    }
  }, [params?.status]);
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
                <Heading size="lg">{item.name}</Heading>

                <VStack mt={3} space={2}>
                  <HStack space={2}>
                    {item.status === RobotStatus.Working && (
                      <RobotStatusInfo
                        info={`${item.speed}km/h`}
                        icon={MaterialIcons}
                        iconName="speed"
                        iconSize={22}
                      />
                    )}
                    <RobotStatusInfo
                      info={`${item.battery}%`}
                      icon={Ionicons}
                      iconName="battery-half-sharp"
                      iconSize={6}
                    />
                    <RobotStatusInfo
                      info={`${item.storage}%`}
                      icon={MaterialCommunityIcons}
                      iconName="basket-fill"
                      iconSize={6}
                    />
                  </HStack>
                  <Divider />
                  <RobotStatusInfo
                    info={`${suburb}, ${city}`}
                    tag="location"
                    icon={Ionicons}
                    iconName="location-outline"
                    iconSize={6}
                  />
                  <Text fontSize="lg">{item.message}</Text>
                </VStack>
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
