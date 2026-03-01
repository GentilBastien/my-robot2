import { EffectState, GameEventTypeEnum, MovementTypeEnum, PathCoordinate, StepPathCoordinate } from 'shared';
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

export interface RequestPathStateEvent extends RequestStateEvent {
  gameEventType: GameEventTypeEnum.PATH;
  movementType: MovementTypeEnum;
  path: PathCoordinate;
}

export interface RequestStepPathStateEvent extends RequestStateEvent {
  gameEventType: GameEventTypeEnum.STEP_PATH;
  movementType: MovementTypeEnum;
  stepPath: StepPathCoordinate;
}

export interface RequestResourcesStateEvent extends RequestStateEvent {
  gameEventType: GameEventTypeEnum.RESOURCES;
}

export interface RequestAddEffectStateEvent extends RequestStateEvent {
  stateEventType: GameEventTypeEnum.ADD_EFFECT;
  effectState: EffectState;
}

// export interface RequestRobotJoinStateEvent extends RequestStateEvent {
//   gameEventType: GameEventTypeEnum.ROBOT_JOINED;
//   robotState: RobotState;
//   lifeTurns: number;
//   priority: 50;
// }

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
//   effectInstance: EffectState;
// }
//
// export interface RemoveEffectRequestStateEvent extends RequestStateEvent {
//   stateEventType: StateEventTypeEnum.REMOVE_EFFECT;
//   effectInstance: EffectState;
// }
