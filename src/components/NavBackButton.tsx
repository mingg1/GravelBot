import { FontAwesome5 } from '@expo/vector-icons';
import { Button } from 'native-base';

interface NavBackButtonProps {
  navigation: { goBack: () => void };
}

const NavBackButton = ({ navigation }: NavBackButtonProps) => (
  <Button
    onPress={() => navigation.goBack()}
    px={2}
    py={1.5}
    ml={6}
    borderRadius={8}
    backgroundColor="gray.100"
  >
    <FontAwesome5 name="chevron-left" size={20} color="orange" />
  </Button>
);

export default NavBackButton;
