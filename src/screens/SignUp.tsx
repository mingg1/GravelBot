import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signIn } from '../redux/slices/authSlice';
import { AppDispatch } from '../redux/store';
import ContentButton from '../components/buttons/ContentButton';
import AuthForm from '../components/form/AuthForm';
import FormInput from '../components/form/FormInput';
import AuthLink from '../components/buttons/AuthLink';

const SignUp = () => {
  const [formData, setFormData] = useState({ userName: '', email: '' });
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();

  return (
    <AuthForm title="Sign Up">
      <FormInput
        label="Email"
        onChangeText={(value) =>
          setFormData((prev) => ({ ...prev, email: value }))
        }
      />
      <FormInput
        label="User name"
        onChangeText={(value) =>
          setFormData((prev) => ({ ...prev, userName: value }))
        }
      />
      <FormInput label="Password" type="password" />
      <FormInput label="Confirm Password" type="password" />
      <ContentButton
        onPress={() => {
          dispatch(signIn(formData));
        }}
        text="Create account"
      />
      <AuthLink
        linkText="Already have an account?"
        linkButtonText="Sign In"
        onPress={() => {
          //@ts-ignore
          navigation.navigate('SignIn');
        }}
      />
    </AuthForm>
  );
};

export default SignUp;
