import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Histories from '../screens/Histories';
import Home from '../screens/Home';
import Robots from '../screens/Robots';
import Statistics from '../screens/Statistics';
import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        unmountOnBlur: true,
        tabBarStyle: { paddingTop: 4, height: 85 },
        tabBarActiveTintColor: '#ff5247',
        tabBarInactiveTintColor: '#808e9b',
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600', marginTop: -4 },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="md-home-outline" size={28} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Robots"
        component={Robots}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="robot-mower-outline"
              size={30}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Histories"
        component={Histories}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="calendar" size={28} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Statistics"
        component={Statistics}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="pie-chart" size={26} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
