import { Effect } from '@entities/effects/effect';
import { EffectFire } from '@entities/effects/in-game-effects/effect-fire';

export type Effects = Record<string, Effect>;

export const allEffects: Readonly<Effects> = {
  [EffectFire.ID]: new EffectFire(),
};
