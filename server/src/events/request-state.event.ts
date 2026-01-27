import { DamageTypeEnum, GameEventTypeEnum, StateEventTypeEnum } from 'shared';
import { EffectInstance } from '@entities/effects/effect-instance';
import { GameEvent } from '@events/game.events';

export interface RequestStateEvent extends GameEvent {
  gameEventType: GameEventTypeEnum.REQUEST_STATE;
  stateEventType: StateEventTypeEnum;
}

export interface DamageRequestStateEvent extends RequestStateEvent {
  stateEventType: StateEventTypeEnum.DAMAGE;
  damageType: DamageTypeEnum;
  sourceId: string;
  targetId: string;
  baseDamage: number;
}

export interface AOEDamageRequestStateEvent extends RequestStateEvent {
  stateEventType: StateEventTypeEnum.DAMAGE;
  damageType: DamageTypeEnum;
  sourceId: string;
  tilesId: string[];
  baseDamage: number;
}

export interface AddEffectRequestStateEvent extends RequestStateEvent {
  stateEventType: StateEventTypeEnum.ADD_EFFECT;
  effectInstance: EffectInstance;
}

export interface RemoveEffectRequestStateEvent extends RequestStateEvent {
  stateEventType: StateEventTypeEnum.REMOVE_EFFECT;
  effectInstance: EffectInstance;
}
