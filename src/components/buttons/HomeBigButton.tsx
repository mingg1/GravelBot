import { GestureResponderEvent, TouchableOpacity } from 'react-native';
import { Heading, Text, VStack } from 'native-base';

interface RobotButtonProps {
  heading: string;
  amount: number;
  bgColor?: string;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
}

const HomeBigButton = ({
  heading,
  amount,
  bgColor,
  onPress,
}: RobotButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <VStack
        px={4}
        py={3}
        backgroundColor={bgColor || '#ff7900'}
        borderRadius={16}
      >
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
export default HomeBigButton;
