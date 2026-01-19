import { Robot } from '../../states/robot';
import { Action } from './action';

export interface ActionInstance {
  id: number;
  source: Robot;
  target: Robot;
  action: Action;
  hasPowerSupply: boolean;
}
