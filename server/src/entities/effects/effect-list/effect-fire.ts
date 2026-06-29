import { ActionElementTypeEnum, ActionTypeEnum, EffectCategoryTypeEnum } from 'shared';
import { AbstractEffect } from '@entities/effects/abstract-effect';
import { EffectStackingConfig, EffectTickingConfig } from '@entities/effects/effect';
import { EffectContext } from '@entities/effects/effect-context';
import { RequestEvent } from '@events/request.event';
import { DamageRequestEvent } from '@events/damage/damage.request-event';

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

  protected override _handleOnTurnEnd = (effectContext: EffectContext): RequestEvent[] => {
    // const { trigger, effectState, readonlyGameState, gameCalculator, action, coordinates } = _effectContext;
    const a = new DamageRequestEvent(
      effectContext.effectState.sourceRobotId,
      ActionTypeEnum.AUTO_ATTACK,
      ActionElementTypeEnum.FIRE,
      effectContext.effectState.targetRobotId!,
      100
    );
    return this.generalHandle(effectContext);
  };
}
