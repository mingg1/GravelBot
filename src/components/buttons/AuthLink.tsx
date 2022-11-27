import { HStack, Link, Text } from 'native-base';
import { ReactNode } from 'react';
import { GestureResponderEvent } from 'react-native';

interface AuthLinkProps {
  onPress?: (event?: GestureResponderEvent | undefined) => any;
  linkText: string;
  linkButtonText: string;
}

const AuthLink = ({ onPress, linkText, linkButtonText }: AuthLinkProps) => (
  <HStack mt="10" justifyContent="center">
    <Text
      fontSize="lg"
      color="coolGray.600"
      _dark={{
        color: 'warmGray.200',
      }}
    >
      {linkText}
    </Text>
    <Link
      ml={3}
      onPress={onPress}
      _text={{
        color: 'green.700',
        fontWeight: 'extrabold',
        fontSize: 'lg',
      }}
    >
      {linkButtonText}
    </Link>
  </HStack>
);

export default AuthLink;
