import { createSlice } from '@reduxjs/toolkit';
import { LatLng } from 'react-native-maps';
import { AreaStatus } from '../../types';

interface WorkingArea {
  name: string;
  description: string;
  area: LatLng[];
  status: AreaStatus;
}

interface WorkingAreaState {
  workingArea: WorkingArea;
  workingAreas: WorkingArea[];
}

const initialState: WorkingAreaState = {
  workingArea: {
    name: '',
    description: '',
    area: [],
    status: AreaStatus.Unchecked,
  },
  workingAreas: [],
};

const workingAreaSlice = createSlice({
  name: 'workingArea',
  initialState,
  reducers: {
    addWorkingArea: (state, action) => {
      state.workingAreas.push(action.payload);
    },
    setCurrentWorkingArea: (state, { payload }: { payload: WorkingArea }) => {
      state.workingArea = payload;
    },
  },
});

export const { addWorkingArea, setCurrentWorkingArea } =
  workingAreaSlice.actions;
export default workingAreaSlice.reducer;
