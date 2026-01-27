import { Effect } from './effect';

export interface EffectInstance {
  id: string;
  sourceId: string;
  targetId: string;
  tileId: string;
  effect: Effect;
  stacks: number;
  remainingTurns: number;
}
