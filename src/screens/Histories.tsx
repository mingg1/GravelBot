import {
  Box,
  Divider,
  FlatList,
  Heading,
  HStack,
  Text,
  VStack,
} from 'native-base';
import { TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { formatDate } from '../helper';
import { RootState } from '../redux/store';

const Histories = () => {
  const {
    tasks: { tasks },
  } = useSelector((state: RootState) => state);

  return (
    <VStack width="90%" marginX="auto">
      <HStack
        my={8}
        p={4}
        borderRadius={12}
        backgroundColor="white"
        space={6}
        justifyContent="space-around"
      ></HStack>

      <FlatList
        data={tasks}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => {}}>
              <Box my={4} p={4} borderRadius={12} backgroundColor="white">
                <Heading size="md">#{item.id}</Heading>
                <Text fontSize="md">Working robot: {item.workingRobot}</Text>
                <Text fontSize="md">location:</Text>
                <Text fontSize="md">
                  Working date:{' '}
                  {formatDate(
                    new Date(item.date.date),
                    new Date(item.date.time)
                  )}
                </Text>
                <Divider />
              </Box>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.id.toString()}
      />
    </VStack>
  );
};

export default Histories;
