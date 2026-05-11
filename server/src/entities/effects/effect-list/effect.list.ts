import { Effect } from '@entities/effects/effect';
import { EffectFire } from '@entities/effects/effect-list/effect-fire';

export type Effects = Record<string, Effect>;

export const effectList: Readonly<Effects> = {
  [EffectFire.ID]: new EffectFire(),
};
