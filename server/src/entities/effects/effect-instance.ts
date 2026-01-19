import { Robot } from '../../states/robot';
import { Effect } from './effect';

export interface EffectInstance {
  id: number;
  source: Robot;
  target: Robot;
  effect: Effect;
  stacks: number;
  remainingTurns: number;
}
