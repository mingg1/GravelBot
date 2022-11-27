import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { getLoggedInUser } from '../redux/slices/authSlice';
import { AreaStatus, RobotStatus } from '../types';
import { Heading, HStack, ScrollView, VStack } from 'native-base';
import Greetings from '../components/Greetings';
import Map from '../components/Map';
import MainBigButton from '../components/buttons/MainBigButton';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Home = () => {
  const {
    auth: { userName },
    workingAreas: { workingAreas },
    robots: { robots },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<AppDispatch>();
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

  useEffect(() => {
    dispatch(getLoggedInUser());
  }, []);

  return (
    <ScrollView>
      <VStack width="85%" marginX="auto">
        <Greetings userName={userName || ''} />
        <HStack my={6} space={4} justifyContent="space-around">
          <MainBigButton
            heading="Working robots"
            amount={
              robots.filter((robot) => robot.status === RobotStatus.Working)
                .length
            }
            onPress={() =>
              navigation.navigate('Robots', { status: RobotStatus.Working })
            }
          />
          <MainBigButton
            heading="Available robots"
            amount={
              robots.filter((robot) => robot.status === RobotStatus.Available)
                .length
            }
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
            heading="Ungraveled areas"
            amount={
              workingAreas.filter(
                (area) => area.status === AreaStatus.Ungraveled
              ).length
            }
            onPress={() =>
              navigation.navigate('AreaInfo', {
                screen: 'Managed Area',
                params: { status: AreaStatus.Ungraveled },
              })
            }
          />
          <MainBigButton
            heading="Graveled areas"
            amount={
              workingAreas.filter((area) => area.status === AreaStatus.Graveled)
                .length
            }
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
