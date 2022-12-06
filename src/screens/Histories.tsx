import { useNavigation } from '@react-navigation/native';
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
import { useDispatch, useSelector } from 'react-redux';
import HistoryStatusInfo from '../components/HistoryStatusInfo';
import { formatDate } from '../helper';
import { AppDispatch, RootState } from '../redux/store';
import { setCurrentTask } from '../redux/slices/taskSlice';

const Histories = () => {
  const {
    tasks: { tasks },
    robots: { robots },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();

  return (
    <VStack width="90%" marginX="auto">
      <FlatList
        data={tasks}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                dispatch(setCurrentTask(item));
                //@ts-ignore
                navigation.navigate('HistoryInfo', {
                  screen: 'History Info',
                });
              }}
            >
              <Box
                my={4}
                px={6}
                py={4}
                borderRadius={12}
                backgroundColor="white"
              >
                <HStack justifyContent="space-between" alignItems="center">
                  <Heading size="lg"># {item.id}</Heading>
                  <Text fontSize="15%">
                    {
                      formatDate(
                        new Date(item.date.date),
                        new Date(item.date.time)
                      ).split('. ')[0]
                    }
                  </Text>
                </HStack>
                <HStack mt={2} space={2}>
                  <HistoryStatusInfo info={item.status} bgColor="blue.500" />
                  <HistoryStatusInfo
                    info={item.description}
                    bgColor="gray.500"
                  />
                </HStack>
                <Divider marginY={4} />
                <Text fontSize="lg" fontWeight={600} letterSpacing={0.5}>
                  {robots.find((robot) => robot.id === item.workingRobot)?.name}
                </Text>
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
