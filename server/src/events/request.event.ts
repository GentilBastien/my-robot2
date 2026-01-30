import { Coordinates, DamageTypeEnum, GameEventTypeEnum } from 'shared';
import { RobotState } from '@states/robot.state';

export interface RequestEvent {
  gameEventType: GameEventTypeEnum;
  priority?: number;
}

export interface RequestTurnEvent extends RequestEvent {
  gameEventType: GameEventTypeEnum.TURN_START | GameEventTypeEnum.TURN_END;
  turnNumber?: number;
  turnRobotId?: string;
}

export interface RequestAdvanceTurnEvent extends RequestEvent {
  gameEventType: GameEventTypeEnum.ADVANCE_TURN;
  turnNumberAdvanced?: number;
  turnRobotIdAdvanced?: string;
}

export interface RequestRobotJoinedEvent extends RequestEvent {
  gameEventType: GameEventTypeEnum.ROBOT_JOINED;
  coordinates?: Coordinates;
  robot?: RobotState;
}

export interface RequestRobotDestroyedEvent extends RequestEvent {
  gameEventType: GameEventTypeEnum.ROBOT_DESTROYED;
  robot?: RobotState;
}

export interface RequestDamageEvent extends RequestEvent {
  damageType: DamageTypeEnum;
  sourceRobotId: string;
  targetRobotId: string;
  baseDamage: number;
}

export interface RequestAOEDamageEvent extends RequestEvent {
  damageType: DamageTypeEnum;
  sourceRobotId: string;
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
