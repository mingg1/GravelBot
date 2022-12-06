import { createStackNavigator } from '@react-navigation/stack';
import NavBackButton from '../components/buttons/NavBackButton';
import RobotInfo from '../screens/RobotInfo';
import RobotSchedule from '../screens/RobotSchedule';

const Stack = createStackNavigator();
const DetailStack = createStackNavigator();

const Schedule = () => (
  <DetailStack.Navigator
    screenOptions={({ navigation }) => {
      return {
        headerBackTitleVisible: false,
        headerLeft: () => <NavBackButton navigation={navigation} />,
      };
    }}
  >
    <DetailStack.Screen
      name="Schedule a task"
      component={RobotSchedule}
      options={{ headerBackTitleVisible: false }}
    />
  </DetailStack.Navigator>
);

const RobotInfoStack = () => (
  <Stack.Navigator
    screenOptions={({ navigation }) => {
      return {
        headerBackTitleVisible: false,
        headerLeft: () => <NavBackButton navigation={navigation} />,
      };
    }}
  >
    <Stack.Screen
      name="Robot Info"
      component={RobotInfo}
      options={{
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="Schedule"
      component={Schedule}
      options={{ headerShown: false, headerBackTitleVisible: false }}
    />
  </Stack.Navigator>
);

export default RobotInfoStack;
