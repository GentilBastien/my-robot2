import { GameEventTypeEnum } from 'shared';
import { GameEvent } from '@events/game.event';

export interface RequestStateEvent extends GameEvent {
  priority?: number;
}

export interface RequestTurnStartStateEvent extends RequestStateEvent {
  gameEventType: GameEventTypeEnum.TURN_START;
}

export interface RequestTurnEndStateEvent extends RequestStateEvent {
  gameEventType: GameEventTypeEnum.TURN_END;
}

export interface RequestAdvanceTurnStateEvent extends RequestStateEvent {
  gameEventType: GameEventTypeEnum.ADVANCE_TURN;
}

// export interface RequestDamageEvent extends RequestStateEvent {
//   damageType: DamageTypeEnum;
//   targetRobotId: string;
//   baseDamage: number;
// }

// export interface RequestAOEDamageEvent extends RequestStateEvent {
//   damageType: DamageTypeEnum;
//   targetTilesId: string[];
//   baseDamage: number;
// }

// export interface AddEffectRequestStateEvent extends RequestStateEvent {
//   stateEventType: StateEventTypeEnum.ADD_EFFECT;
//   effectInstance: EffectInstance;
// }
//
// export interface RemoveEffectRequestStateEvent extends RequestStateEvent {
//   stateEventType: StateEventTypeEnum.REMOVE_EFFECT;
//   effectInstance: EffectInstance;
// }
