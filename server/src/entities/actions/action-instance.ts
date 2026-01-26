import { Action } from './action';
import { Robot } from '../../entities/robot/robot';

export interface ActionInstance {
  id: number;
  source: Robot;
  target: Robot;
  action: Action;
  hasPowerSupply: boolean;
}
