import { HStack, ScrollView } from 'native-base';
import { useSelector } from 'react-redux';
import Greetings from '../components/Greetings';
import Map from '../components/Map';
import RobotButton from '../components/RobotButton';
import { RootState } from '../redux/store';
import { RobotStatus } from './Robots';

const Home = () => {
  const {
    auth: { userName },
  } = useSelector((state: RootState) => state);

  return (
    <ScrollView width="85%" marginX="auto">
      <Greetings userName={userName} />
      <HStack my={6} space={4} justifyContent="space-around">
        <RobotButton
          heading="Working robots"
          amount={0}
          status={RobotStatus.Working}
        />
        <RobotButton
          heading="Available robots"
          amount={1}
          status={RobotStatus.Available}
        />
      </HStack>
      <Map />
    </ScrollView>
  );
};

export default Home;
