import { EffectCategoryTypeEnum } from 'shared';
import { AbstractEffect } from '@entities/effects/abstract-effect';
import { EffectStackingConfig, EffectTickingConfig } from '@entities/effects/effect';

export class EffectFire extends AbstractEffect {
  constructor() {
    const ticking: EffectTickingConfig = {
      totalTurns: 5,
      everyTurn: true,
      atApply: true,
    };
    const stacking: EffectStackingConfig = {
      enabled: true,
      maxStacks: 5,
      refreshDuration: true,
    };
    super('EffectFire', EffectCategoryTypeEnum.NEGATIVE, ticking, stacking);
  }
}
