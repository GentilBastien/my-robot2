import { EffectCategoryTypeEnum, EffectTypeEnum, ElementTypeEnum } from 'shared';
import { AbstractEffect } from '@entities/effects/abstract-effect';
import { EffectStackingConfig, EffectTickingConfig } from '@entities/effects/effect';
import { EffectContext } from '@entities/effects/effect-context';
import { RequestEvent } from '@events/request.event';
import { DamageRequestEvent } from '@events/damage/damage.request-event';

export class EffectFire extends AbstractEffect {
  public static instance = new EffectFire();

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
    const { trigger, effectState, gameState, gameStateHandler, pendingRequests, action, coordinates } = effectContext;
    const damageRequestEvent = new DamageRequestEvent(
      effectContext.effectState.sourceRobotId,
      undefined,
      EffectTypeEnum.EFFECT_FIRE,
      ElementTypeEnum.FIRE,
      effectContext.effectState.targetRobotId!,
      100
    );
    pendingRequests.insertEnd(damageRequestEvent);

    return this.generalHandle(effectContext);
  };
}
