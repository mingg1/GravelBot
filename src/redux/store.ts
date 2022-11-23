import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import robotReducer from './slices/robotSlice';
import workingAreaReducer from './slices/workingAreaSlice';
import taskReducer from './slices/taskSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    robots: robotReducer,
    workingAreas: workingAreaReducer,
    tasks: taskReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
