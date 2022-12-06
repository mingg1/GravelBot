import { Box, FormControl, Input, VStack, useToast } from 'native-base';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { SetStateAction, useState } from 'react';
import { Platform } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import { useDispatch } from 'react-redux';
import { addTaskHistory } from '../redux/slices/taskSlice';
import { formatDate } from '../helper';
import { updateRobot } from '../redux/slices/robotSlice';
import { useNavigation } from '@react-navigation/native';
import { RobotStatus } from '../types';
import ContentButton from '../components/buttons/ContentButton';
import GroupButtons from '../components/buttons/GroupButtons';

const RobotSchedule = () => {
  const {
    robots: { robot },
    workingAreas: { workingAreas },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<AppDispatch>();
  const toast = useToast();
  const navigation = useNavigation();

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
          <GroupButtons
            lText="Date"
            lListener={showDatePicker}
            rText="Time"
            rListener={showTimepicker}
          />
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
          <ContentButton
            text="Save task"
            onPress={() => {
              if (value) {
                dispatch(
                  addTaskHistory({
                    workingRobot: robot.id,
                    date: {
                      date: date.toDateString(),
                      time: time.toString(),
                    },

                    location: value && value.map((val) => JSON.parse(val)),
                  })
                );
                dispatch(
                  updateRobot({
                    id: robot.id,
                    status: RobotStatus.Working,
                    speed: 0.5,
                    storage: robot.storage - 5,
                  })
                );

                toast.show({
                  title: `New task has been scheduled to ${robot.name}`,
                  placement: 'bottom',
                  mb: 16,
                });

                navigation.navigate(
                  //@ts-ignore
                  'Robots',
                  { status: RobotStatus.Working }
                );
              }
            }}
          />
        </VStack>
      </Box>
    </Box>
  );
};

export default RobotSchedule;
