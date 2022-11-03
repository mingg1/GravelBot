import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {
  Box,
  Button,
  Divider,
  FlatList,
  Heading,
  HStack,
  Text,
  VStack,
} from 'native-base';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import RobotStatusButton from '../components/RobotStatusOptions';

export enum RobotStatus {
  Working = 'Working',
  Available = 'Available',
  Unavailable = 'Unavailable',
}

type RootStackParamList = {
  Robots: { status: RobotStatus };
};

type DetailScreenProps = BottomTabScreenProps<RootStackParamList, 'Robots'>;

const Robots = ({
  route: {
    params: { status },
  },
}: DetailScreenProps) => {
  const [selected, setSelected] = useState(status || RobotStatus.Available);
  const isSelected = (status: string) => selected === status;
  const data = [
    {
      id: 1,
      name: 'GravelBot 1',
      stauts: 'Available',
      battery: 65,
      message: 'Ready to use',
    },
  ];
  return (
    <VStack width="90%" marginX="auto">
      <HStack
        my={8}
        p={4}
        borderRadius={12}
        backgroundColor="white"
        space={6}
        justifyContent="space-around"
      >
        {Object.keys(RobotStatus).map((status) => (
          <RobotStatusButton
            key={status}
            status={status}
            setSelected={setSelected}
            isSelected={isSelected(status)}
          />
        ))}
      </HStack>
      <Heading>{selected} robots</Heading>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <Box my={4} p={4} borderRadius={12} backgroundColor="white">
              <Heading size="md">{item.name}</Heading>
              <Text fontSize="md">{item.battery}%</Text>
              <Divider />
              <Text>{item.message}</Text>
            </Box>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </VStack>
  );
};

export default Robots;
