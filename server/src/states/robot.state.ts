import { Coordinates } from 'shared';

export interface RobotState {
  robotId: string;
  name: string;
  hp: number;
  location: Coordinates;
}
