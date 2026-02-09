import { Action } from './action';

export interface ActionInstance {
  id: string;
  sourceRobotId: string;
  targetRobotId: string;
  action: Action;
  hasPowerSupply: boolean;
}
