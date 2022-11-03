import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { Heading, Text, VStack } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { RobotStatus } from '../screens/Robots';

interface RobotButtonProps {
  heading: string;
  amount: number;
  status: RobotStatus;
}

const RobotButton = ({ heading, amount, status }: RobotButtonProps) => {
  console.log(status);
  const navigation =
    useNavigation<
      BottomTabNavigationProp<
        { Home: undefined; Robots: { status: RobotStatus } },
        'Home'
      >
    >();
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Robots', { status })}>
      <VStack px={4} py={3} backgroundColor="orange.500" borderRadius={16}>
        <Heading fontSize="md" mb={2} color="white">
          {heading}
        </Heading>
        <Text fontSize="3xl" color="white" fontWeight={600}>
          {amount}
        </Text>
      </VStack>
    </TouchableOpacity>
  );
};
export default RobotButton;
