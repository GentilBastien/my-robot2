import { Effect, EffectStackingConfig, EffectTickingConfig } from '../effect';
import { DamageTypeEnum, EffectCategoryTypeEnum, GameEventTypeEnum, StateEventTypeEnum } from 'shared';
import { EffectInstance } from '../effect-instance';
import {
  AddEffectRequestStateEvent,
  DamageRequestStateEvent,
  RemoveEffectRequestStateEvent,
} from '@events/request-state.event';
import { GameEvent } from '@events/game.events';

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

  public onApply(effectInstance: EffectInstance): GameEvent[] {
    const addEffectRequest: AddEffectRequestStateEvent = {
      gameEventType: GameEventTypeEnum.REQUEST_STATE,
      stateEventType: StateEventTypeEnum.ADD_EFFECT,
      effectInstance: effectInstance,
    };
    return [addEffectRequest];
  }

  public onTurnStart(effectInstance: EffectInstance): GameEvent[] {
    const damageIntent: DamageRequestStateEvent = {
      gameEventType: GameEventTypeEnum.REQUEST_STATE,
      stateEventType: StateEventTypeEnum.DAMAGE,
      damageType: DamageTypeEnum.FIRE,
      source: effectInstance.source,
      target: effectInstance.target,
      baseDamage: 1,
    };
    return [damageIntent];
  }

  public onTurnEnd(_: EffectInstance): GameEvent[] {
    return [];
  }

  public onEveryTurnStart(effectInstance: EffectInstance): GameEvent[] {
    return [];
  }

  public onEveryTurnEnd(effectInstance: EffectInstance): GameEvent[] {
    return [];
  }

  public onExpire(effectInstance: EffectInstance): GameEvent[] {
    const addEffectRequest: RemoveEffectRequestStateEvent = {
      gameEventType: GameEventTypeEnum.REQUEST_STATE,
      stateEventType: StateEventTypeEnum.REMOVE_EFFECT,
      effectInstance: effectInstance,
    };
    return [addEffectRequest];
  }
}
