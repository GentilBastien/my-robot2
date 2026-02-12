import { DamageTypeEnum, GameEventTypeEnum, ResponseTypeEnum, RobotState } from 'shared';

export interface ResponseEvent {
  gameEventType: GameEventTypeEnum;
  responseType: ResponseTypeEnum;
  priority?: number;
}

export interface AdvanceTurnResponseEvent extends ResponseEvent {
  gameEventType: GameEventTypeEnum.ADVANCE_TURN;
  turnNumber: number;
  turnRobotId: string;
}

export interface DamageResponseEvent extends ResponseEvent {
  source: RobotState;
  target: RobotState;
  damageDealt: number;
  damageType: DamageTypeEnum;
  isDodged: boolean;
  isCritical: boolean;
  armorEfficiency: number;
}
