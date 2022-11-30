import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {
  Box,
  Divider,
  Heading,
  HStack,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import { useSelector } from 'react-redux';
import ContentButton from '../components/buttons/ContentButton';
import RobotStatusInfo from '../components/RobotStatusInfo';
import useLocation from '../hooks/useLocation';
import { RootState } from '../redux/store';
import { RobotStatus } from '../types';

const RobotInfo = () => {
  const navigation = useNavigation();
  const {
    robots: { robot },
  } = useSelector((state: RootState) => state);
  const {
    location: {
      address: { suburb, city, road, house_number },
    },
  } = useLocation(robot.location.latitude, robot.location.longitude);

  return (
    <ScrollView width="85%" marginX="auto">
      <Box my={12} px={8} py={10} borderTopRadius={16} backgroundColor="white">
        <VStack space={3}>
          <Heading size="xl">{robot.name}</Heading>
          <Divider />
          <HStack space={1}>
            {robot.status === RobotStatus.Available && (
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
          <Text fontSize="lg" fontWeight={600} mt={4}>
            {robot.status === RobotStatus.Available && robot.message}
          </Text>
        </VStack>
        <ContentButton
          onPress={() => {
            //@ts-ignore
            navigation.navigate('Schedule', { params: { item: robot } });
          }}
          text="Schedule a task"
        />
      </Box>
    </ScrollView>
  );
};

export default RobotInfo;
