import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import {
  Box,
  Divider,
  Heading,
  HStack,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import ContentButton from '../components/buttons/ContentButton';
import RobotStatusInfo from '../components/RobotStatusInfo';
import { formatArea, formatDate } from '../helper';
import useLocation from '../hooks/useLocation';

import { RobotStatus, TaskStatus } from '../types';
import * as geolib from 'geolib';
import MapView, { Polygon } from 'react-native-maps';
import RobotMarker from '../components/RobotMarker';
import AlertDialog from '../components/AlertDialog';

const RobotInfo = () => {
  const navigation = useNavigation();
  const {
    robots: { robot },
    tasks: { tasks },
  } = useSelector((state: RootState) => state);
  const {
    location: {
      address: { suburb, city },
    },
  } = useLocation(robot.location.latitude, robot.location.longitude);
  const task = tasks.find(
    (t) => t.workingRobot === robot.id && t.status === TaskStatus.Ongoing
  );
  const date =
    task &&
    formatDate(new Date(task.date.date), new Date(task.date.time)).split('. ');
  const allArea = task?.location.reduce((acc, location) => {
    const area = geolib.getAreaOfPolygon(location);
    return acc + area;
  }, 0);

  return (
    <ScrollView>
      <Box
        width="90%"
        marginX="auto"
        my={12}
        px={8}
        py={10}
        borderTopRadius={16}
        backgroundColor="white"
      >
        {robot.status === RobotStatus.Working && (
          <MapView
            style={{ height: 250 }}
            region={{
              latitude: robot.location.latitude,
              longitude: robot.location.longitude,
              latitudeDelta: 0.0013,
              longitudeDelta: 0.0032,
            }}
          >
            {task?.location.map((l, i) => (
              <Polygon
                key={i}
                fillColor="#43b67b85"
                strokeColor="green"
                coordinates={l}
              />
            ))}
            <RobotMarker coordinate={robot.location} />
          </MapView>
        )}
        <VStack space={3} mt={4}>
          <Heading size="xl">{robot.name}</Heading>
          <Divider />
          <HStack space={1}>
            {robot.status === RobotStatus.Working && (
              <RobotStatusInfo
                info={`${robot.speed}km/h`}
                fontSize={14}
                icon={MaterialIcons}
                iconName="speed"
                iconSize={18}
              />
            )}
            <RobotStatusInfo
              info={`${robot.battery}%`}
              fontSize={14}
              icon={Ionicons}
              iconName="battery-half-sharp"
              iconSize={5}
            />
            <RobotStatusInfo
              info={`${robot.storage}%`}
              fontSize={14}
              icon={MaterialCommunityIcons}
              iconName="basket-fill"
              iconSize={4}
            />
          </HStack>
          <RobotStatusInfo
            info={`${suburb}, ${city}`}
            tag="location"
            icon={Ionicons}
            iconName="location-outline"
            iconSize={6}
          />
          {robot.status === RobotStatus.Working && (
            <>
              <Divider />
              <HStack space={4}>
                <VStack alignItems="center">
                  <Heading fontSize="md">Total area</Heading>
                  <Text fontSize="xl" fontWeight={600}>
                    {allArea && formatArea(allArea)}
                  </Text>
                </VStack>
                <VStack alignItems="center">
                  <Heading fontSize="md">Cleaned area</Heading>
                  <Text fontSize="xl" fontWeight={600}>
                    0.24km²
                  </Text>
                </VStack>
                <VStack alignItems="center">
                  <Heading fontSize="md">Time left</Heading>
                  <Text fontSize="xl" fontWeight={600}>
                    0:35
                  </Text>
                </VStack>
              </HStack>
              <Divider />
              <Heading fontSize="md">Work progress</Heading>
              <Text fontSize="md">{task?.description}</Text>
              <Text fontWeight={600} fontSize="xl">
                Work #{task?.id}
              </Text>
              {task?.log?.map((t, i) => {
                console.log(t.time);
                return (
                  <HStack key={i}>
                    <Text fontWeight={600} fontSize="md">
                      {
                        formatDate(new Date(t.time), new Date(t.time)).split(
                          '. '
                        )[2]
                      }
                    </Text>
                    <Text fontSize="md"> {t.description}</Text>
                  </HStack>
                );
              })}
            </>
          )}

          {robot.message && robot.status !== RobotStatus.Working && (
            <Text fontSize="lg" fontWeight={600} mt={4}>
              {robot.message}
            </Text>
          )}
        </VStack>
        {robot.status === RobotStatus.Available && (
          <ContentButton
            onPress={() => {
              //@ts-ignore
              navigation.navigate('Schedule', { params: { item: robot } });
            }}
            text="Schedule a task"
          />
        )}
        {robot.status === RobotStatus.Working && (
          <VStack space={8}>
            <ContentButton
              onPress={() => {
                //@ts-ignore
                navigation.navigate('Schedule', { params: { item: robot } });
              }}
              text="Show robot camera"
            />
            <AlertDialog />
          </VStack>
        )}
      </Box>
    </ScrollView>
  );
};

export default RobotInfo;
