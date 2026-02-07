import { Action } from './action';

export interface ActionInstance {
  id: number;
  sourceRobotId: string;
  targetRobotId: string;
  action: Action;
  hasPowerSupply: boolean;
}
