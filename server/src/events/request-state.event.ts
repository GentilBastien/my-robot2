import { GameEventTypeEnum, MovementTypeEnum, PathCoordinate, RobotState } from 'shared';
import { GameEvent } from '@events/game.event';

export interface RequestStateEvent extends GameEvent {
  priority?: number;
}

export interface RequestTurnStartStateEvent extends RequestStateEvent {
  gameEventType: GameEventTypeEnum.TURN_START;
  priority: 3;
}

export interface RequestTurnEndStateEvent extends RequestStateEvent {
  gameEventType: GameEventTypeEnum.TURN_END;
  priority: 1;
}

export interface RequestAdvanceTurnStateEvent extends RequestStateEvent {
  gameEventType: GameEventTypeEnum.ADVANCE_TURN;
  priority: 2;
}

export interface RequestMoveStateEvent extends RequestStateEvent {
  gameEventType: GameEventTypeEnum.MOVEMENT;
  movementType: MovementTypeEnum;
  path: PathCoordinate;
  priority: 10;
}

export interface RequestRobotResourcesStateEvent extends RequestStateEvent {
  priority: 10;
  //TODO
}

export interface RequestRobotJoinStateEvent extends RequestStateEvent {
  gameEventType: GameEventTypeEnum.ROBOT_JOINED;
  robotState: RobotState;
  lifeTurns: number;
  priority: 50;
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
