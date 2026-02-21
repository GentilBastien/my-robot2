import { DamageTypeEnum, GameEventTypeEnum, RobotState, StepPathCoordinate } from 'shared';
import { GameEvent } from '@events/game.event';

export interface ResponseStateEvent extends GameEvent {
  responseValidated: boolean;
}

export interface StartTurnResponseStateEvent extends ResponseStateEvent {
  gameEventType: GameEventTypeEnum.TURN_START;
  turnNumber: number;
  turnRobotId: string;
}

export interface EndTurnResponseStateEvent extends ResponseStateEvent {
  gameEventType: GameEventTypeEnum.TURN_END;
  turnNumber: number;
  turnRobotId: string;
}

export interface AdvanceTurnResponseStateEvent extends ResponseStateEvent {
  gameEventType: GameEventTypeEnum.ADVANCE_TURN;
  turnNumber: number;
  turnRobotId: string;
}

export interface MoveResponseStateEvent extends ResponseStateEvent {
  gameEventType: GameEventTypeEnum.MOVEMENT;
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
