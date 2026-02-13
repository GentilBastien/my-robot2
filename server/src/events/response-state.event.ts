import { DamageTypeEnum, GameEventTypeEnum, ResponseTypeEnum, RobotState } from 'shared';

export interface ResponseStateEvent {
  gameEventType: GameEventTypeEnum;
  responseType: ResponseTypeEnum;
  priority?: number;
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
