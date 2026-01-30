import { Effect, EffectStackingConfig, EffectTickingConfig } from '../effect';
import { DamageTypeEnum, EffectCategoryTypeEnum, GameEventTypeEnum } from 'shared';
import { EffectInstance } from '../effect-instance';
import { RequestEvent } from '@events/request.event';

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

  public onApply(effectInstance: EffectInstance): RequestEvent[] {
    const addEffectRequest: AddEffectRequestStateEvent = {
      gameEventType: GameEventTypeEnum.REQUEST_STATE,
      stateEventType: StateEventTypeEnum.ADD_EFFECT,
      effectInstance: effectInstance,
    };
    return [addEffectRequest];
  }

  public onTurnStart(effectInstance: EffectInstance): RequestEvent[] {
    const damageIntent: DamageRequestStateEvent = {
      stateEventType: StateEventTypeEnum.DAMAGE,
      damageType: DamageTypeEnum.FIRE,
      sourceId: effectInstance.sourceId,
      targetId: effectInstance.targetId,
      baseDamage: 1,
    };
    return [damageIntent];
  }

  public onTurnEnd(_: EffectInstance): RequestEvent[] {
    return [];
  }

  public onEveryTurnStart(effectInstance: EffectInstance): RequestEvent[] {
    return [];
  }

  public onEveryTurnEnd(effectInstance: EffectInstance): RequestEvent[] {
    return [];
  }

  public onExpire(effectInstance: EffectInstance): RequestEvent[] {
    const addEffectRequest: RemoveEffectRequestStateEvent = {
      gameEventType: GameEventTypeEnum.REQUEST_STATE,
      stateEventType: StateEventTypeEnum.REMOVE_EFFECT,
      effectInstance: effectInstance,
    };
    return [addEffectRequest];
  }
}
