import { DamageTypeEnum, GameEventTypeEnum } from 'shared';
import { Robot } from '../states/robot';
import { EffectInstance } from '../entities/effects/effect-instance';

export interface GameEvent {
  eventType: GameEventTypeEnum;
}

export interface DamageRequestGameEvent extends GameEvent {
  eventType: GameEventTypeEnum.DAMAGE_REQUEST;
  damageType: DamageTypeEnum;
  source: Robot;
  target: Robot;
  baseDamage: number;
}

export interface DamageResponseGameEvent extends GameEvent {
  eventType: GameEventTypeEnum.DAMAGE_RESPONSE;
  source: Robot;
  target: Robot;
  damageDealt: number;
  isDodged: boolean;
  isCritical: boolean;
  armorEfficiency: number;
}

export interface AddEffectRequestGameEvent extends GameEvent {
  eventType: GameEventTypeEnum.ADD_EFFECT_REQUEST;
  effect: EffectInstance;
}

export interface RemoveEffectGameEvent extends GameEvent {
  eventType: GameEventTypeEnum.REMOVE_EFFECT_REQUEST;
  effectId: number;
}
