import { Effect } from '@entities/effects/effect';
import { EffectFire } from '@entities/effects/effect-list/effect-fire';
import { EffectTypeEnum } from 'shared';

export type Effects = Record<string, Effect>;

export const effectList: Readonly<Effects> = {
  [EffectTypeEnum.EFFECT_FIRE]: EffectFire.instance,
};
