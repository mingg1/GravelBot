import { useNavigation } from '@react-navigation/native';
import {
  Box,
  Center,
  FormControl,
  Heading,
  HStack,
  Input,
  Link,
  Button,
  Text,
  VStack,
} from 'native-base';

const SignIn = () => {
  const navigation = useNavigation();
  return (
    <Center w="100%">
      <Box safeArea w="90%" py={3} alignItems="center">
        <Heading size="xl" py={6}>
          Sign in
        </Heading>
        <VStack space={5} mt="3" width="80%">
          <FormControl>
            <FormControl.Label>Email</FormControl.Label>
            <Input p={3.5} size="lg" />
          </FormControl>
          <FormControl mt={3}>
            <FormControl.Label>Password</FormControl.Label>
            <Input type="password" p={3.5} size="lg" />
          </FormControl>
          <Button
            colorScheme="indigo"
            mt={10}
            p={3.5}
            size="lg"
            _text={{ fontSize: 'lg', fontWeight: 600 }}
          >
            Sign in
          </Button>
        </VStack>
        <HStack mt="10" justifyContent="center">
          <Text
            fontSize="lg"
            color="coolGray.600"
            _dark={{
              color: 'warmGray.200',
            }}
          >
            Don't have an account?
          </Text>
          <Link
            ml={3}
            onPress={() => {
              //@ts-ignore
              navigation.navigate('SignUp');
            }}
            _text={{
              color: 'indigo.500',
              fontWeight: 'medium',
              fontSize: 'lg',
            }}
          >
            Sign Up
          </Link>
        </HStack>
      </Box>
    </Center>
  );
};

export default SignIn;
