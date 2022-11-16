import { useNavigation } from '@react-navigation/native';
import { Avatar, Text, VStack } from 'native-base';
import { useDispatch } from 'react-redux';
import { removeUser, signIn, signOut } from '../redux/slices/authSlice';
import { AppDispatch } from '../redux/store';

const Greetings = ({ userName }: { userName: string }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();
  return (
    <VStack mt={24}>
      <Avatar bg="green.700" size={'lg'} />
      <Text
        fontWeight={600}
        fontSize={32}
        mt={2}
        onPress={async () => {
          const result = await dispatch(signOut());
          if (signOut.fulfilled.match(result)) {
            dispatch(removeUser());
          }
          //@ts-ignore
          navigation.navigate('Auth', { screen: 'SignIn' });
        }}
      >
        Welcome {userName}!
      </Text>
    </VStack>
  );
};
export default Greetings;
