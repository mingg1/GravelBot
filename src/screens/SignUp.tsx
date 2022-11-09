import { useNavigation } from '@react-navigation/native';
import {
  Box,
  Center,
  FormControl,
  Heading,
  HStack,
  Input,
  Link,
  Text,
  VStack,
} from 'native-base';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signIn } from '../redux/slices/authSlice';
import { AppDispatch } from '../redux/store';
import MainButton from '../components/MainButton';

const SignUp = () => {
  const [formData, setFormData] = useState({ userName: '', email: '' });
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();

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
          <MainButton
            onPress={() => {
              dispatch(signIn(formData));
            }}
            text=" Create account"
          />
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
              color: 'green.700',
              fontWeight: 'extrabold',
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
