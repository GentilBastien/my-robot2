import { Effect } from '@entities/effects/effect';
import { EffectFire } from '@entities/effects/in-game-effects/effect-fire';

export type Effects = Record<string, Effect>;

export const allEffects: Effects = {
  EffectFire: new EffectFire(),
};
