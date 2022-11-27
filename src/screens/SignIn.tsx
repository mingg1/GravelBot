import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { signIn } from '../redux/slices/authSlice';
import { useNavigation } from '@react-navigation/native';
import ContentButton from '../components/buttons/ContentButton';
import AuthForm from '../components/form/AuthForm';
import FormInput from '../components/form/FormInput';
import AuthLink from '../components/buttons/AuthLink';

const SignIn = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState('');

  return (
    <AuthForm title="Sign In">
      <FormInput label="Email" onChangeText={(value) => setEmail(value)} />
      <FormInput label="Password" type="password" />
      <ContentButton
        onPress={() => {
          dispatch(signIn({ email }));
        }}
        text="Sign In"
      />
      <AuthLink
        linkText="Don't have an account?"
        linkButtonText="Sign Up"
        onPress={() => {
          //@ts-ignore
          navigation.navigate('SignUp');
        }}
      />
    </AuthForm>
  );
};

export default SignIn;
