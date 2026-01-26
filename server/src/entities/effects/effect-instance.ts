import { Effect } from './effect';
import { Robot } from '../robot/robot';

export interface EffectInstance {
  id: string;
  source: Robot;
  target: Robot;
  effect: Effect;
  stacks: number;
  remainingTurns: number;
}
