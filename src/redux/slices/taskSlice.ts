import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task, TaskStatus } from '../../types';

interface TaskState {
  task: Task;
  tasks: Task[];
}

const initialState: TaskState = {
  task: {
    id: 0,
    workingRobot: '',
    date: { date: '', time: '' },
    status: TaskStatus.Ongoing,
    location: [],
  },
  tasks: [],
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setCurrentRobot: (state, action: PayloadAction<Task>) => {
      state.task = action.payload;
    },
    addTaskHistory: (state, action) => {
      state.tasks.push({
        ...action.payload,
        id: state.tasks.length + 1,
        status: TaskStatus.Ongoing,
      });
    },
  },
});

export const { addTaskHistory } = taskSlice.actions;
export default taskSlice.reducer;
