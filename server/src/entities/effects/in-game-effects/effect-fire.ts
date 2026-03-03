import { EffectStackingConfig, EffectTickingConfig } from '../effect';
import { EffectCategoryTypeEnum } from 'shared';
import { AbstractEffect } from '@entities/effects/abstract-effect';

export class EffectFire extends AbstractEffect {
  protected _id = 'EffectFire';
  protected _type: EffectCategoryTypeEnum = EffectCategoryTypeEnum.NEGATIVE;

  protected _ticking: EffectTickingConfig = {
    totalTurns: 5,
    everyTurn: true,
    atApply: true,
  };

  protected _stacking: EffectStackingConfig = {
    enabled: true,
    maxStacks: 5,
    refreshDuration: true,
  };
}
