import { Button, Text } from 'native-base';
import { RobotStatus } from '../screens/Robots';

interface RobotStatusButtonProps {
  status: string;
  isSelected: boolean;
  setSelected: React.Dispatch<React.SetStateAction<RobotStatus>>;
}

const RobotStatusButton = ({
  status,
  setSelected,
  isSelected,
}: RobotStatusButtonProps) => {
  return (
    <Button
      onPress={() => {
        setSelected(status as RobotStatus);
      }}
      px={4}
      py={3}
      borderRadius={12}
      backgroundColor={isSelected ? '#ff7900' : 'white'}
    >
      <Text
        letterSpacing={1}
        color={isSelected ? 'white' : '#808e9b'}
        fontWeight="bold"
      >
        {status}
      </Text>
    </Button>
  );
};

export default RobotStatusButton;
