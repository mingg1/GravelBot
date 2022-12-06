import { useNavigation } from '@react-navigation/native';
import { AlertDialog as Dialog, Button, Center } from 'native-base';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { updateRobot } from '../redux/slices/robotSlice';
import { updateTask } from '../redux/slices/taskSlice';
import { AppDispatch, RootState } from '../redux/store';
import { RobotStatus, TaskStatus } from '../types';

const AlertDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef(null);
  const {
    tasks: { task },
    robots: { robots },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();

  return (
    <Center>
      <Button
        colorScheme="danger"
        onPress={() => setIsOpen(!isOpen)}
        width="100%"
        p={3.5}
        borderRadius={8}
        _text={{ fontSize: 'lg', fontWeight: 'bold' }}
      >
        Force stop
      </Button>
      <Dialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
        <Dialog.Content>
          <Dialog.CloseButton />
          <Dialog.Header>Stop Robot</Dialog.Header>
          <Dialog.Body>
            This will stop the working robot. This action cannot be cancelled.
          </Dialog.Body>
          <Dialog.Footer>
            <Button.Group space={2}>
              <Button
                variant="unstyled"
                _text={{ color: 'gray.500' }}
                onPress={onClose}
                ref={cancelRef}
              >
                Cancel
              </Button>
              <Button
                colorScheme="danger"
                onPress={() => {
                  dispatch(
                    updateTask({ id: task.id, status: TaskStatus.Cancelled })
                  );
                  dispatch(
                    updateRobot({
                      id: task.workingRobot,
                      status: RobotStatus.Available,
                    })
                  );

                  //@ts-ignore
                  navigation.navigate('Robots', {
                    status: RobotStatus.Available,
                  });
                }}
              >
                Stop
              </Button>
            </Button.Group>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>
    </Center>
  );
};

export default AlertDialog;
