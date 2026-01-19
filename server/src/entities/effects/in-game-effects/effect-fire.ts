import { Effect, EffectStackingConfig, EffectTickingConfig } from '../effect';
import { DamageTypeEnum, EffectCategoryTypeEnum, StateEventTypeEnum } from 'shared';
import { EffectInstance } from '../effect-instance';
import {
  AddEffectRequestStateEvent,
  DamageRequestStateEvent,
  RemoveEffectRequestStateEvent,
  RequestStateEvent,
} from '../../../events/request-state-event';

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
      stateEventType: StateEventTypeEnum.ADD_EFFECT,
      effectInstance: effectInstance,
    };
    return [addEffectRequest];
  }

  public onTurnStart(effectInstance: EffectInstance): RequestStateEvent[] {
    const damageIntent: DamageRequestStateEvent = {
      stateEventType: StateEventTypeEnum.DAMAGE,
      damageType: DamageTypeEnum.FIRE,
      source: effectInstance.source,
      target: effectInstance.target,
      baseDamage: 1,
    };
    return [damageIntent];
  }

  public onTurnEnd(_: EffectInstance): RequestStateEvent[] {
    return [];
  }

  public onExpire(effectInstance: EffectInstance): RequestStateEvent[] {
    const addEffectRequest: RemoveEffectRequestStateEvent = {
      stateEventType: StateEventTypeEnum.REMOVE_EFFECT,
      effectInstance: effectInstance,
    };
    return [addEffectRequest];
  }
}
