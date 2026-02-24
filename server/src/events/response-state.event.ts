import { DamageTypeEnum, GameEventTypeEnum, PathCoordinate, RobotState, StepPathCoordinate } from 'shared';
import { GameEvent } from '@events/game.event';

export interface ResponseStateEvent extends GameEvent {
  responseValidated: boolean;
}

export interface TurnStartResponseStateEvent extends ResponseStateEvent {
  gameEventType: GameEventTypeEnum.TURN_START;
  turnNumber: number;
  turnRobotId: string;
}

export interface TurnEndResponseStateEvent extends ResponseStateEvent {
  gameEventType: GameEventTypeEnum.TURN_END;
  turnNumber: number;
  turnRobotId: string;
}

export interface AdvanceTurnResponseStateEvent extends ResponseStateEvent {
  gameEventType: GameEventTypeEnum.ADVANCE_TURN;
  turnNumber: number;
  turnRobotId: string;
}

export interface PathResponseStateEvent extends ResponseStateEvent {
  gameEventType: GameEventTypeEnum.PATH;
  path: PathCoordinate;
}

export interface StepPathResponseStateEvent extends ResponseStateEvent {
  gameEventType: GameEventTypeEnum.STEP_PATH;
  stepPath: StepPathCoordinate;
}

export interface DamageResponseStateEvent extends ResponseStateEvent {
  source: RobotState;
  target: RobotState;
  damageDealt: number;
  damageType: DamageTypeEnum;
  isDodged: boolean;
  isCritical: boolean;
  armorEfficiency: number;
}
