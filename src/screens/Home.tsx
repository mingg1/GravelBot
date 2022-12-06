import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { AreaStatus, RobotStatus } from '../types';
import { Heading, HStack, ScrollView, VStack } from 'native-base';
import Greetings from '../components/Greetings';
import Map from '../components/Map';
import HomeBigButton from '../components/buttons/HomeBigButton';
import { TouchableOpacity } from 'react-native-gesture-handler';

const getLength = (arr: any[], status: any) =>
  arr.filter((item) => item.status === status).length;

const Home = () => {
  const {
    auth: { userName },
    workingAreas: { workingAreas },
    robots: { robots },
  } = useSelector((state: RootState) => state);

  const navigation = useNavigation<
    BottomTabNavigationProp<
      {
        Home: undefined;
        Robots: { status: RobotStatus };
        AreaInfo: { screen: string; params: {} };
        Map: { pointer?: boolean };
      },
      'Home'
    >
  >();

  return (
    <ScrollView>
      <VStack width="85%" marginX="auto">
        <Greetings userName={userName || ''} />
        <HStack my={6} space={4} justifyContent="space-around">
          <HomeBigButton
            heading="Working robots"
            amount={getLength(robots, RobotStatus.Working)}
            onPress={() =>
              navigation.navigate('Robots', { status: RobotStatus.Working })
            }
          />
          <HomeBigButton
            heading="Available robots"
            bgColor="blue.600"
            amount={getLength(robots, RobotStatus.Available)}
            onPress={() =>
              navigation.navigate('Robots', { status: RobotStatus.Available })
            }
          />
        </HStack>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Map', { pointer: false });
          }}
        >
          <Map height={300} pointerEvents="none" />
        </TouchableOpacity>
        <Heading mt={4}>Managed Area</Heading>
        <HStack my={6} space={4} justifyContent="space-around">
          <HomeBigButton
            heading="Ungraveled areas"
            bgColor="red.500"
            amount={getLength(workingAreas, AreaStatus.Ungraveled)}
            onPress={() =>
              navigation.navigate('AreaInfo', {
                screen: 'Managed Area',
                params: { status: AreaStatus.Ungraveled },
              })
            }
          />
          <HomeBigButton
            heading="Graveled areas"
            bgColor="green.600"
            amount={getLength(workingAreas, AreaStatus.Graveled)}
            onPress={() =>
              navigation.navigate('AreaInfo', {
                screen: 'Managed Area',
                params: { status: AreaStatus.Graveled },
              })
            }
          />
        </HStack>
      </VStack>
    </ScrollView>
  );
};

export default Home;
