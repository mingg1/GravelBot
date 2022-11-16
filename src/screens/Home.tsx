import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { Heading, HStack, ScrollView, VStack } from 'native-base';
import { useSelector } from 'react-redux';
import Greetings from '../components/Greetings';
import Map from '../components/Map';
import MainBigButton from '../components/MainBigButton';
import { AppDispatch, RootState } from '../redux/store';
import { AreaStatus, RobotStatus } from '../types';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Home = () => {
  const {
    auth: { userName },
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
          <MainBigButton
            heading="Working robots"
            amount={0}
            onPress={() =>
              navigation.navigate('Robots', { status: RobotStatus.Working })
            }
          />
          <MainBigButton
            heading="Available robots"
            amount={1}
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
        <Heading>Managed Area</Heading>
        <HStack my={6} space={4} justifyContent="space-around">
          <MainBigButton
            heading="Unchecked areas"
            amount={0}
            onPress={() =>
              navigation.navigate('AreaInfo', {
                screen: 'Managed Area',
                params: { status: AreaStatus.Unchecked },
              })
            }
          />
          <MainBigButton
            heading="Checked areas"
            amount={0}
            onPress={() =>
              navigation.navigate('AreaInfo', {
                screen: 'Managed Area',
                params: { status: AreaStatus.Checked },
              })
            }
          />
        </HStack>
      </VStack>
    </ScrollView>
  );
};

export default Home;
