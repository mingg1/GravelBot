import { useNavigation } from '@react-navigation/native';
import { Box, Divider, Heading, ScrollView, Text } from 'native-base';
import { useSelector } from 'react-redux';
import ContentButton from '../components/ContentButton';
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
        <Heading size="md">{robot.name}</Heading>
        <Divider />
        <Text fontSize="md">battery: {robot.battery}%</Text>
        <Text fontSize="md">gravel filled: {robot.storage}%</Text>
        <Text fontSize="md">
          location: {road} {house_number} / {suburb}, {city}
        </Text>
        <Text fontSize="md">
          {robot.status === RobotStatus.Available && robot.message}
        </Text>
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
