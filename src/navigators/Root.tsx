import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getLoggedInUser } from '../redux/slices/authSlice';
import { AppDispatch, RootState } from '../redux/store';
import Map from '../screens/Map';
import AuthStack from './AuthStack';
import HistoryStack from './HistoryStack';
import ManagedAreaStack from './ManagedAreaStack';
import RobotInfoStack from './RobotInfoStack';
import Tabs from './Tab';

const Stack = createStackNavigator();

const Root = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    auth: { email },
  } = useSelector((state: RootState) => state);

  useEffect(() => {
    if (!email) dispatch(getLoggedInUser());
  }, []);

  return (
    <NavigationContainer>
      <StatusBar barStyle="default" />
      <Stack.Navigator
        screenOptions={{ headerShown: false, headerBackTitleVisible: false }}
      >
        {email ? (
          <>
            <Stack.Screen name="Tabs" component={Tabs} />
            <Stack.Screen name="Map" component={Map} />
            <Stack.Screen name="RobotInfo" component={RobotInfoStack} />
            <Stack.Screen name="HistoryInfo" component={HistoryStack} />
            <Stack.Screen name="AreaInfo" component={ManagedAreaStack} />
          </>
        ) : (
          <Stack.Screen name="Auth" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Root;
