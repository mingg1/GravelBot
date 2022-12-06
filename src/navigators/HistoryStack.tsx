import { createStackNavigator } from '@react-navigation/stack';
import NavBackButton from '../components/buttons/NavBackButton';
import HistoryInfo from '../screens/HistoryInfo';

const Stack = createStackNavigator();

const HistoryStack = () => (
  <Stack.Navigator
    screenOptions={({ navigation }) => {
      return {
        headerBackTitleVisible: false,
        headerLeft: () => <NavBackButton navigation={navigation} />,
      };
    }}
  >
    <Stack.Screen
      name="History Info"
      component={HistoryInfo}
      options={{
        headerBackTitleVisible: false,
      }}
    />
  </Stack.Navigator>
);

export default HistoryStack;
