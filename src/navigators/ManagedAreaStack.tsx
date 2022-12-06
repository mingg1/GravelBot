import { createStackNavigator } from '@react-navigation/stack';
import { Button } from 'native-base';
import NavBackButton from '../components/buttons/NavBackButton';
import AreaInfo from '../screens/AreaInfo';
import ManagedArea from '../screens/ManagedArea';
import RobotSchedule from '../screens/RobotSchedule';

const Stack = createStackNavigator();
const DetailStack = createStackNavigator();

const Schedule = () => (
  <DetailStack.Navigator>
    <DetailStack.Screen
      name="Schedule a task"
      component={RobotSchedule}
      options={{ headerBackTitleVisible: false }}
    />
  </DetailStack.Navigator>
);

const ManagedAreaStack = () => (
  <Stack.Navigator
    screenOptions={({ navigation }) => {
      return {
        headerBackTitleVisible: false,
        headerLeft: () => <NavBackButton navigation={navigation} />,
        headerRight: () => (
          <Button
            mr={6}
            variant="ghost"
            _text={{ fontSize: 'lg', fontWeight: 700, color: 'orange.500' }}
            onPress={() => {
              navigation.navigate('Map', { pointer: true });
            }}
          >
            Add
          </Button>
        ),
      };
    }}
  >
    <Stack.Screen
      name="Managed Area"
      component={ManagedArea}
      options={{
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="WorkingAreaInfo"
      component={AreaInfo}
      options={{ headerTitle: 'Working area', headerRight: undefined }}
    />
  </Stack.Navigator>
);

export default ManagedAreaStack;
