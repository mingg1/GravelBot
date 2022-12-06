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
    speed: 0,
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
      speed: 0,
    },
    {
      id: 2,
      name: 'GravelBot 2',
      status: RobotStatus.Unavailable,
      battery: 85,
      storage: 100,
      message: 'Condition check',
      location: { latitude: 60.22406592508648, longitude: 24.75837655090797 },
      speed: 0,
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
          return { ...robot, ...action.payload };
        }
        return robot;
      });
      state.robot = { ...state.robot, ...action.payload };
    },
  },
});

export const { setCurrentRobot, updateRobot } = robotSlice.actions;
export default robotSlice.reducer;
