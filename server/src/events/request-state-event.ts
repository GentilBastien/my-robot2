import { DamageTypeEnum, StateEventTypeEnum } from 'shared';
import { Robot } from '../states/robot';
import { EffectInstance } from '../entities/effects/effect-instance';

export interface RequestStateEvent {
  stateEventType: StateEventTypeEnum;
}

export interface DamageRequestStateEvent extends RequestStateEvent {
  stateEventType: StateEventTypeEnum.DAMAGE;
  damageType: DamageTypeEnum;
  source: Robot;
  target: Robot;
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
