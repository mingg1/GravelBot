import { Button, HStack } from 'native-base';
import { GestureResponderEvent } from 'react-native';

interface GroupButtonsProps {
  lText: string;
  lListener?: (event: GestureResponderEvent) => void;
  rText: string;
  rListener?: (event: GestureResponderEvent) => void;
  positionObj?: any;
}

const BtnStyle = {
  flex: 1,
  backgroundColor: 'green.600',
  _text: {
    fontSize: '16%',
    fontWeight: 600,
  },
};

const GroupButtons = ({
  lText,
  lListener,
  rText,
  rListener,
  positionObj,
}: GroupButtonsProps) => (
  <HStack justifyContent={'center'} space={8}>
    <Button
      {...BtnStyle}
      onPress={lListener}
      style={positionObj && { ...positionObj }}
    >
      {lText}
    </Button>
    <Button
      {...BtnStyle}
      onPress={rListener}
      style={positionObj && { ...positionObj }}
    >
      {rText}
    </Button>
  </HStack>
);

export default GroupButtons;
