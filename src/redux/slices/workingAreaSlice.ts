import { createSlice } from '@reduxjs/toolkit';
import { LatLng } from 'react-native-maps';
import { AreaStatus, WorkingArea } from '../../types';

interface WorkingAreaState {
  workingArea: WorkingArea;
  workingAreas: WorkingArea[];
}

const initialState: WorkingAreaState = {
  workingArea: {
    id: 0,
    name: '',
    description: '',
    coordinates: [],
    status: AreaStatus.Ungraveled,
    lastGraveled: Date.now() - 43200000,
  },
  workingAreas: [
    {
      id: 1,
      name: 'Test',
      description: 'Test',
      coordinates: [
        { latitude: 60.224097504322, longitude: 24.75849552532958 },
        { latitude: 60.22455285336744, longitude: 24.758872961195692 },
        { latitude: 60.22432976368586, longitude: 24.75757860225255 },
      ],
      status: AreaStatus.Ungraveled,
      lastGraveled: Date.now() - 43200000,
    },
  ],
};

const workingAreaSlice = createSlice({
  name: 'workingArea',
  initialState,
  reducers: {
    addWorkingArea: (state, action) => {
      state.workingAreas.push({
        ...action.payload,
        id: state.workingAreas.length + 1,
      });
    },
    updateWorkingArea: (state, action) => {
      state.workingAreas = state.workingAreas.map((area) => {
        if (area.id === action.payload.id) {
          return { ...area, ...action.payload.info };
        }
      });
    },
    deleteWorkingArea: (state, action) => {
      state.workingAreas = state.workingAreas.filter(
        (area) => area.id !== action.payload.id
      );
    },
    setCurrentWorkingArea: (state, { payload }: { payload: WorkingArea }) => {
      state.workingArea = payload;
    },
    updatCurrentWorkingArea: (state, action) => {
      state.workingArea = { ...state.workingArea, ...action.payload };
    },
  },
});

export const {
  addWorkingArea,
  updateWorkingArea,
  deleteWorkingArea,
  setCurrentWorkingArea,
  updatCurrentWorkingArea,
} = workingAreaSlice.actions;
export default workingAreaSlice.reducer;
