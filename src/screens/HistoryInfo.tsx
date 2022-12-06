import {
  Box,
  Divider,
  Heading,
  HStack,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import { useSelector } from 'react-redux';
import HistoryStatusInfo from '../components/HistoryStatusInfo';
import { formatDate } from '../helper';
import useLocations from '../hooks/useLocations';
import { RootState } from '../redux/store';

const HistoryInfo = () => {
  const {
    tasks: { task },
    robots: { robots },
  } = useSelector((state: RootState) => state);
  const date = formatDate(
    new Date(task.date.date),
    new Date(task.date.time)
  ).split('. ');
  const { location } = useLocations(task.location.map((l) => l[0]));

  return (
    <ScrollView width="85%" marginX="auto">
      <Box my={12} px={6} py={10} borderTopRadius={16} backgroundColor="white">
        <VStack space={3}>
          <HStack justifyContent="space-between">
            <VStack space={2}>
              <Heading fontSize="md">Work ID</Heading>
              <Heading size="xl">#{task.id}</Heading>
            </VStack>
            <VStack space={2}>
              <HistoryStatusInfo
                info={task.description}
                bgColor="gray.500"
                fontSize="xs"
              />
              <HistoryStatusInfo
                info={task.status}
                bgColor="blue.500"
                fontSize="xs"
              />
            </VStack>
          </HStack>
          <Text fontSize="xl" color="gray.600">
            {date[0]}
          </Text>
          <HStack space={4} alignItems="center">
            <Heading fontSize="md" color="gray.600">
              Working robot
            </Heading>
            <Text fontWeight={600} fontSize="24%">
              {robots.find((robot) => robot.id === task.workingRobot)?.name}
            </Text>
          </HStack>

          <Heading fontSize="md" color="gray.600">
            Cleaned area(s)
          </Heading>

          {location.map((l, i) => (
            <HistoryStatusInfo
              key={i}
              info={`${l.address.road || ''} ${l.address.house_number || ''}, ${
                l.address.city
              }`}
              bgColor="orange.500"
              fontSize="md"
              position="flex-start"
            />
          ))}
          <Divider />
          <Heading color="gray.600" fontSize="md">
            Cleaning Logs
          </Heading>
          {task?.log?.map((t, i) => {
            console.log(t.time);
            return (
              <HStack key={i}>
                <Text fontWeight={600} fontSize="md">
                  {
                    formatDate(new Date(t.time), new Date(t.time)).split(
                      '. '
                    )[2]
                  }
                </Text>
                <Text fontSize="md"> {t.description}</Text>
              </HStack>
            );
          })}
        </VStack>
      </Box>
    </ScrollView>
  );
};

export default HistoryInfo;
