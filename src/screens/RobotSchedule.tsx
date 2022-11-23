import { Box, Button, FormControl, HStack, Input, VStack } from 'native-base';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { SetStateAction, useState } from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DropDownPicker, { ItemType } from 'react-native-dropdown-picker';
import { useDispatch } from 'react-redux';
import { addTaskHistory } from '../redux/slices/taskSlice';
import { formatDate } from '../helper';
import { updateRobot } from '../redux/slices/robotSlice';

const RobotSchedule = () => {
  const {
    robots: { robot },
    workingAreas: { workingAreas },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<AppDispatch>();

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [mode, setMode] = useState<'date' | 'time' | undefined>('date');
  const [show, setShow] = useState(false);
  const [value, setValue] = useState<string[] | null>(null);
  const [open, setOpen] = useState(false);

  const [items, setItems] = useState(
    workingAreas.map((area) => ({
      label: area.name,
      value: JSON.stringify(area.coordinates),
    }))
  );

  const onChange = (selectedValue: Date | undefined) => {
    setShow(Platform.OS === 'ios');
    if (mode == 'date') {
      const currentDate = selectedValue || new Date();
      setDate(currentDate);
      setMode('time');
    } else {
      const selectedTime = selectedValue || new Date();
      setTime(selectedTime);
      setMode('date');
    }
    setShow(false);
  };

  const showMode = (
    currentMode: SetStateAction<'date' | 'time' | undefined>
  ) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatePicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <Box width="90%" marginX="auto" height="100%">
      <Box
        my={12}
        px={8}
        py={10}
        borderTopRadius={16}
        backgroundColor="white"
        justifyContent="center"
      >
        <VStack space={5} mt="3">
          <FormControl isDisabled={true}>
            <FormControl.Label>Working robot</FormControl.Label>
            <Input p={3.5} size="lg" value={robot.name} width={'100%'} />
          </FormControl>
          <FormControl>
            <FormControl.Label>Starting date</FormControl.Label>
            <DateTimePickerModal
              isVisible={show}
              mode={mode}
              onConfirm={(date) => {
                onChange(date);
              }}
              onCancel={() => {
                setShow(false);
              }}
            />
            <Input
              p={3.5}
              size="lg"
              value={formatDate(date, time)}
              width={'100%'}
            />
          </FormControl>
          <HStack justifyContent={'center'} space={8}>
            <Button flex={1} onPress={showDatePicker}>
              Date
            </Button>
            <Button flex={1} onPress={showTimepicker}>
              Time
            </Button>
          </HStack>

          <FormControl mt={3}>
            <FormControl.Label>Working area(s)</FormControl.Label>
            <DropDownPicker
              zIndexInverse={1000}
              placeholder="Select area(s)"
              open={open}
              value={value || []}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              multiple={true}
              mode="BADGE"
              style={{ zIndex: 99 }}
              onSelectItem={(item) => {
                console.log(item);
              }}
            />
          </FormControl>
          <Button
            style={{ zIndex: -1 }}
            colorScheme="orange"
            mt={10}
            p={3.5}
            size="lg"
            _text={{ fontSize: 'lg', fontWeight: 600 }}
            onPress={() => {
              console.log(robot.name, {
                date: date.toDateString(),
                time: time.toString(),
                location: value && value.map((val) => JSON.parse(val)),
              });

              if (value) {
                dispatch(
                  addTaskHistory({
                    workingRobot: robot.name,
                    date: {
                      date: date.toDateString(),
                      time: time.toString(),
                    },
                    location: value && value.map((val) => JSON.parse(val)),
                  })
                );
                dispatch(updateRobot({ id: robot.id }));
              }
            }}
          >
            Save task
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default RobotSchedule;
