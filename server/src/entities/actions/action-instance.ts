import { Action } from './action';
import { RobotState } from '@states/robot.state';

export interface ActionInstance {
  id: number;
  source: RobotState;
  target: RobotState;
  action: Action;
  hasPowerSupply: boolean;
}
