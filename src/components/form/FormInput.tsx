import { FormControl, Input } from 'native-base';
import { useState } from 'react';

interface FormInputProps {
  label: string;
  type?: 'text' | 'password';
  onChangeText?: (text: string) => void | undefined;
}

const FormInput = ({ label, type, onChangeText }: FormInputProps) => {
  const [backgroundColor, setBackgroundColor] = useState('white');
  return (
    <FormControl>
      <FormControl.Label>{label}</FormControl.Label>
      <Input
        backgroundColor={backgroundColor}
        focusOutlineColor="green.700"
        onFocus={() => {
          setBackgroundColor('#04aa6d24');
        }}
        onBlur={() => {
          setBackgroundColor('white');
        }}
        p={3.5}
        size="lg"
        onChangeText={onChangeText}
        type={type || 'text'}
      />
    </FormControl>
  );
};

export default FormInput;
