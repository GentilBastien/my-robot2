import { DamageTypeEnum, GameEventTypeEnum, ResponseTypeEnum, RobotState } from 'shared';
import { GameEvent } from '@events/game.event';

export interface ResponseStateEvent extends GameEvent {
  responseType: ResponseTypeEnum;
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

export interface DamageResponseStateEvent extends ResponseStateEvent {
  source: RobotState;
  target: RobotState;
  damageDealt: number;
  damageType: DamageTypeEnum;
  isDodged: boolean;
  isCritical: boolean;
  armorEfficiency: number;
}
