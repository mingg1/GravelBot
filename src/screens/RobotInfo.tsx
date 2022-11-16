import { useNavigation } from '@react-navigation/native';
import { Box, Divider, Heading, ScrollView, Text } from 'native-base';
import { useSelector } from 'react-redux';
import ContentButton from '../components/ContentButton';
import Map from '../components/Map';
import { RootState } from '../redux/store';
import { RobotStatus } from '../types';

const RobotInfo = () => {
  const navigation = useNavigation();
  const {
    robots: { robot },
  } = useSelector((state: RootState) => state);

  return (
    <ScrollView width="85%" marginX="auto">
      <Box my={12} px={8} py={10} borderTopRadius={16} backgroundColor="white">
        <Heading size="md">{robot.name}</Heading>
        <Divider />
        <Text fontSize="md">{robot.battery}%</Text>
        <Text fontSize="md">{robot.message}</Text>
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
