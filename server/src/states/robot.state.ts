import { Coordinates } from 'shared';

export interface RobotState {
  id: string;
  name: string;
  hp: number;
  location: Coordinates;
}
