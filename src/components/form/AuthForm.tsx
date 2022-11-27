import { Box, Center, Heading, HStack, VStack } from 'native-base';
import { ReactNode } from 'react';

interface AuthFormProps {
  title: string;
  children: ReactNode;
}

const AuthForm = ({ title, children }: AuthFormProps) => {
  return (
    <Center w="100%">
      <Box safeArea w="90%" py={3} alignItems="center">
        <Heading size="xl" py={6}>
          {title}
        </Heading>
        <VStack space={4} mt="3" width="80%">
          {children}
        </VStack>
      </Box>
    </Center>
  );
};

export default AuthForm;
