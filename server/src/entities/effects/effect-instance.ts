import { Effect } from './effect';
import { Robot } from '../../states/robot/robot';

export interface EffectInstance {
  id: string;
  source: Robot;
  target: Robot;
  effect: Effect;
  stacks: number;
  remainingTurns: number;
}
