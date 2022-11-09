import { Button, Text } from 'native-base';

interface StatusButtonProps<T> {
  status: string;
  isSelected: boolean;
  setSelected: React.Dispatch<React.SetStateAction<T>>;
}

const StatusButton = <T extends unknown>({
  status,
  setSelected,
  isSelected,
}: StatusButtonProps<T>) => {
  return (
    <Button
      onPress={() => {
        setSelected(status as T);
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

export default StatusButton;
