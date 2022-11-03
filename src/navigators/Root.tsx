import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getLoggedInUser } from '../redux/slices/authSlice';
import { AppDispatch, RootState } from '../redux/store';
import AuthStack from './AuthStack';
import Tabs from './Tab';

const Stack = createStackNavigator();

const Root = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    auth: { userName, email },
  } = useSelector((state: RootState) => state);

  useEffect(() => {
    if (!userName) dispatch(getLoggedInUser());
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {userName && email ? (
          <Stack.Screen name="Tabs" component={Tabs} />
        ) : (
          <Stack.Screen name="Auth" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Root;
