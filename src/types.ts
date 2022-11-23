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
  lastGraveled?: string;
}

export enum TaskStatus {
  Done = 'Done',
  Ongoing = 'Ongoing',
}

export interface Task {
  id: number;
  workingRobot: string;
  date: { date: string; time: string };
  status: TaskStatus;
  location: LatLng[];
}
