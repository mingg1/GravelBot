import { LatLng } from 'react-native-maps';

export enum RobotStatus {
  Working = 'Working',
  Available = 'Available',
  Unavailable = 'Unavailable',
}

export interface Robot {
  id: number;
  name: string;
  status: RobotStatus;
  battery: number;
  storage: number;
  message: string;
  location: LatLng;
  speed: number;
}

export enum AreaStatus {
  Graveled = 'Graveled',
  Ungraveled = 'Ungraveled',
  Blocked = 'Blocked',
}

export interface WorkingArea {
  id: number;
  name: string;
  description: string;
  coordinates: LatLng[];
  status: AreaStatus;
  lastGraveled?: number;
}

export enum TaskStatus {
  Done = 'Done',
  Ongoing = 'Ongoing',
  Cancelled = 'Cancelled',
}

export interface TaskLog {
  time: string;
  description: string;
}

export interface Task {
  id: number;
  workingRobot: number;
  date: { date: string; time: string };
  status: TaskStatus;
  description: string;
  location: LatLng[][];
  log: TaskLog[];
}
