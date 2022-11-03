import { Avatar, Text, VStack } from 'native-base';

const Greetings = ({ userName }: { userName: string }) => (
  <VStack mt={24}>
    <Avatar bg="green.700" size={'lg'} />
    <Text fontWeight={600} fontSize={32} mt={2}>
      Welcome {userName}!
    </Text>
  </VStack>
);
export default Greetings;
