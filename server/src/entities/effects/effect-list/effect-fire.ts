import { EffectCategoryTypeEnum } from 'shared';
import { AbstractEffect } from '@entities/effects/abstract-effect';
import { EffectStackingConfig, EffectTickingConfig } from '@entities/effects/effect';

export class EffectFire extends AbstractEffect {
  public static readonly ID = 'EffectFire';

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
    super(EffectCategoryTypeEnum.NEGATIVE, ticking, stacking);
  }
}
