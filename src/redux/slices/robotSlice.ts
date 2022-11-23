import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Robot, RobotStatus } from '../../types';

interface RobotState {
  robot: Robot;
  robots: Robot[];
}

const initialState: RobotState = {
  robot: {
    id: 1,
    name: 'GravelBot 1',
    status: RobotStatus.Available,
    battery: 65,
    storage: 100,
    message: 'Ready to use',
    location: { latitude: 60.22406592508648, longitude: 24.75837655090797 },
  },
  robots: [
    {
      id: 1,
      name: 'GravelBot 1',
      status: RobotStatus.Available,
      battery: 65,
      storage: 100,
      message: 'Ready to use',
      location: { latitude: 60.22406592508648, longitude: 24.75837655090797 },
    },
  ],
};

const robotSlice = createSlice({
  name: 'robot',
  initialState,
  reducers: {
    setCurrentRobot: (state, action: PayloadAction<Robot>) => {
      state.robot = action.payload;
    },
    updateRobot: (state, action) => {
      state.robots = state.robots.map((robot) => {
        if (robot.id === action.payload.id) {
          return { ...robot, status: RobotStatus.Working };
        }
        return robot;
      });
      state.robot.status = action.payload.status;
    },
  },
});

export const { setCurrentRobot, updateRobot } = robotSlice.actions;
export default robotSlice.reducer;
