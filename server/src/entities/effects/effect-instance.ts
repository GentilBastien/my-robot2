import { Robot } from '../../states/robot';
import { Effect } from './effect';

export interface EffectInstance {
  id: string;
  source: Robot;
  target: Robot;
  effect: Effect;
  stacks: number;
  remainingTurns: number;
}
