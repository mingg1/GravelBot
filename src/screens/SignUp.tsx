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
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { signIn } from '../redux/slices/authSlice';
import { AppDispatch, RootState } from '../redux/store';

const SignUp = () => {
  const [formData, setFormData] = useState({ userName: '', email: '' });
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const {
    auth: { isLoading, userName, email },
  } = useSelector((state: RootState) => state);
  return (
    <Center w="100%">
      <Box safeArea w="90%" py={3} alignItems="center">
        <Heading size="xl" py={6}>
          Sign up
        </Heading>
        <VStack space={4} mt={3} width="80%">
          <FormControl>
            <FormControl.Label>Email</FormControl.Label>
            <Input
              p={3.5}
              size="lg"
              onChangeText={(value) =>
                setFormData((prev) => ({ ...prev, email: value }))
              }
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>User name</FormControl.Label>
            <Input
              p={3.5}
              size="lg"
              onChangeText={(value) =>
                setFormData((prev) => ({ ...prev, userName: value }))
              }
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input type="password" p={3.5} size="lg" />
          </FormControl>
          <FormControl>
            <FormControl.Label>Confirm Password</FormControl.Label>
            <Input type="password" p={3.5} size="lg" />
          </FormControl>
          <Button
            onPress={() => {
              dispatch(signIn(formData));
              //@ts-ignore
              navigation.navigate('Tabs', { screen: 'Home' });
            }}
            colorScheme="indigo"
            mt={10}
            p={3.5}
            size="lg"
            _text={{ fontSize: 'lg', fontWeight: 600 }}
          >
            Create account
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
            Already have an account?
          </Text>
          <Link
            ml={3}
            onPress={() => {
              dispatch(signIn(formData));
              //@ts-ignore
              navigation.navigate('SignIn');
            }}
            _text={{
              color: 'indigo.500',
              fontWeight: 'medium',
              fontSize: 'lg',
            }}
          >
            Sign In
          </Link>
        </HStack>
      </Box>
    </Center>
  );
};

export default SignUp;
