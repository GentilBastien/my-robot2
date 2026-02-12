import { Coordinates, DamageTypeEnum, GameEventTypeEnum, RobotState } from 'shared';

export interface RequestEvent {
  gameEventType: GameEventTypeEnum;
  sourceRobotId: string;
  priority?: number;
}

export interface RequestTurnEvent extends RequestEvent {
  gameEventType: GameEventTypeEnum.TURN_START | GameEventTypeEnum.TURN_END;
}

export interface RequestAdvanceTurnEvent extends RequestEvent {
  gameEventType: GameEventTypeEnum.ADVANCE_TURN;
}

export interface RequestRobotJoinedEvent extends RequestEvent {
  gameEventType: GameEventTypeEnum.ROBOT_JOINED;
  coordinates: Coordinates;
  robot: RobotState;
}

export interface RequestRobotDestroyedEvent extends RequestEvent {
  gameEventType: GameEventTypeEnum.ROBOT_DESTROYED;
  robot: RobotState;
}

export interface RequestDamageEvent extends RequestEvent {
  damageType: DamageTypeEnum;
  targetRobotId: string;
  baseDamage: number;
}

export interface RequestAOEDamageEvent extends RequestEvent {
  damageType: DamageTypeEnum;
  targetTilesId: string[];
  baseDamage: number;
}

// export interface AddEffectRequestStateEvent extends RequestEvent {
//   stateEventType: StateEventTypeEnum.ADD_EFFECT;
//   effectInstance: EffectInstance;
// }
//
// export interface RemoveEffectRequestStateEvent extends RequestEvent {
//   stateEventType: StateEventTypeEnum.REMOVE_EFFECT;
//   effectInstance: EffectInstance;
// }
