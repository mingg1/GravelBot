import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { State } from 'react-native-gesture-handler';
import { formatDate } from '../../helper';
import { Task, TaskStatus } from '../../types';

interface TaskState {
  task: Task;
  tasks: Task[];
}

const initialState: TaskState = {
  task: {
    id: 0,
    workingRobot: 1,
    date: { date: '', time: '' },
    status: TaskStatus.Ongoing,
    description: 'Gravel distributing',
    location: [],
    log: [],
  },
  tasks: [],
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setCurrentTask: (state, action: PayloadAction<Task>) => {
      const desc = state.task.description;
      state.task = action.payload;
      state.task.description = desc;
    },
    addTaskHistory: (state, action) => {
      console.log(action.payload.date);
      state.tasks.push({
        ...action.payload,
        id: state.tasks.length + 1,
        status: TaskStatus.Ongoing,
        description: 'Gravel distributing',
        log: [
          {
            time: action.payload.date.time,
            description: 'Gravelbot has started the task',
          },
          {
            time: new Date(
              new Date(action.payload.date.time).getTime() + 900000
            ).getTime(),
            description: 'Gravelbot has started working',
          },
        ],
      });
    },
    updateTask: (state, action) => {
      state.tasks = state.tasks.map((task) => {
        if (task.id === action.payload.id) {
          return { ...task, status: action.payload.status };
        }
        return task;
      });
      state.task.status = action.payload.status;
    },
  },
});

export const { addTaskHistory, setCurrentTask, updateTask } = taskSlice.actions;
export default taskSlice.reducer;
