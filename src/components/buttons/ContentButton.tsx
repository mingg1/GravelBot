import { GestureResponderEvent } from 'react-native';
import { Button } from 'native-base';

interface ContentButtonProps {
  onPress?: (event: GestureResponderEvent) => void;
  text: string;
  bgColor?: string;
}

const ContentButton = ({ onPress, text, bgColor }: ContentButtonProps) => (
  <Button
    zIndex={-1}
    onPress={onPress}
    bgColor={bgColor || '#ff7900'}
    mt={10}
    p={3.5}
    size="md"
    borderRadius={8}
    _text={{ fontSize: 'lg', fontWeight: 'bold' }}
  >
    {text}
  </Button>
);

export default ContentButton;
