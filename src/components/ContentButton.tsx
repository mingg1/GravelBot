import { GestureResponderEvent } from 'react-native';
import { Button } from 'native-base';

interface ContentButtonProps {
  onPress?: (event: GestureResponderEvent) => void;
  text: string;
}

const ContentButton = ({ onPress, text }: ContentButtonProps) => (
  <Button
    onPress={onPress}
    bgColor="#ff7900"
    mt={10}
    p={3.5}
    size="md"
    _text={{ fontSize: 'lg', fontWeight: 600 }}
  >
    {text}
  </Button>
);

export default ContentButton;
