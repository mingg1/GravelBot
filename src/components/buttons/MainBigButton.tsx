import { Heading, Text, VStack } from 'native-base';
import { GestureResponderEvent, TouchableOpacity } from 'react-native';

interface RobotButtonProps {
  heading: string;
  amount: number;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
}

const MainBigButton = ({ heading, amount, onPress }: RobotButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <VStack px={4} py={3} backgroundColor="#ff7900" borderRadius={16}>
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
export default MainBigButton;
