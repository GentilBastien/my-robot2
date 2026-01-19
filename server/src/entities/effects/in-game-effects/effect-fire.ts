import { Effect, EffectStackingConfig, EffectTickingConfig } from '../effect';
import { DamageTypeEnum, EffectCategoryTypeEnum, GameEventTypeEnum } from 'shared';
import { EffectInstance } from '../effect-instance';
import {
  AddEffectRequestGameEvent,
  DamageRequestGameEvent,
  GameEvent,
  RemoveEffectGameEvent,
} from '../../../events/game-event';

export class EffectFire implements Effect {
  type: EffectCategoryTypeEnum = EffectCategoryTypeEnum.NEGATIVE;
  ticking: EffectTickingConfig = {
    everyTurn: true,
    atApply: true,
  };
  stacking: EffectStackingConfig = {
    enabled: true,
    maxStacks: 5,
    refreshDuration: true,
  };
  onApply(effectInstance: EffectInstance): GameEvent[] {
    const addEffectRequest: AddEffectRequestGameEvent = {
      eventType: GameEventTypeEnum.ADD_EFFECT_REQUEST,
      effect: effectInstance,
    };
    return [addEffectRequest];
  }

  onTurnStart(effectInstance: EffectInstance): GameEvent[] {
    const damageIntent: DamageRequestGameEvent = {
      eventType: GameEventTypeEnum.DAMAGE_REQUEST,
      damageType: DamageTypeEnum.FIRE,
      source: effectInstance.source,
      target: effectInstance.target,
      baseDamage: 1,
    };
    return [damageIntent];
  }

  onExpire(effectInstance: EffectInstance): GameEvent[] {
    const removeEffect: RemoveEffectGameEvent = {
      eventType: GameEventTypeEnum.REMOVE_EFFECT_REQUEST,
      effectId: effectInstance.id,
    };
    return [removeEffect];
  }
}
