import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RobotStatus } from '../../types';

interface Robot {
  id: number;
  name: string;
  status: RobotStatus;
  battery: number;
  message: string;
}

interface RobotState {
  robot: Robot;
}

const initialState: RobotState = {
  robot: {
    id: 0,
    name: '',
    status: RobotStatus.Available,
    battery: 0,
    message: '',
  },
};

const robotSlice = createSlice({
  name: 'robot',
  initialState,
  reducers: {
    setCurrentRobot: (state, action: PayloadAction<Robot>) => {
      state.robot = action.payload;
    },
  },
});

export const { setCurrentRobot } = robotSlice.actions;
export default robotSlice.reducer;
