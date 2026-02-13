import { Effect, EffectStackingConfig, EffectTickingConfig } from '../effect';
import { DamageTypeEnum, EffectCategoryTypeEnum, GameEventTypeEnum } from 'shared';
import { EffectInstance } from '../effect-instance';
import { RequestStateEvent } from '@events/request-state.event';

export class EffectFire implements Effect {
  public type: EffectCategoryTypeEnum = EffectCategoryTypeEnum.NEGATIVE;

  public ticking: EffectTickingConfig = {
    totalTurns: 5,
    everyTurn: true,
    atApply: true,
  };

  public stacking: EffectStackingConfig = {
    enabled: true,
    maxStacks: 5,
    refreshDuration: true,
  };

  public onApply(effectInstance: EffectInstance): RequestStateEvent[] {
    const addEffectRequest: AddEffectRequestStateEvent = {
      gameEventType: GameEventTypeEnum.REQUEST_STATE,
      stateEventType: StateEventTypeEnum.ADD_EFFECT,
      effectInstance: effectInstance,
    };
    return [addEffectRequest];
  }

  public onTurnStart(effectInstance: EffectInstance): RequestStateEvent[] {
    const damageIntent: DamageRequestStateEvent = {
      stateEventType: StateEventTypeEnum.DAMAGE,
      damageType: DamageTypeEnum.FIRE,
      sourceId: effectInstance.sourceId,
      targetId: effectInstance.targetId,
      baseDamage: 1,
    };
    return [damageIntent];
  }

  public onTurnEnd(_: EffectInstance): RequestStateEvent[] {
    return [];
  }

  public onEveryTurnStart(effectInstance: EffectInstance): RequestStateEvent[] {
    return [];
  }

  public onEveryTurnEnd(effectInstance: EffectInstance): RequestStateEvent[] {
    return [];
  }

  public onExpire(effectInstance: EffectInstance): RequestStateEvent[] {
    const addEffectRequest: RemoveEffectRequestStateEvent = {
      gameEventType: GameEventTypeEnum.REQUEST_STATE,
      stateEventType: StateEventTypeEnum.REMOVE_EFFECT,
      effectInstance: effectInstance,
    };
    return [addEffectRequest];
  }
}
