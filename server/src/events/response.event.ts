import { RobotState } from '@states/robot.state';
import { DamageTypeEnum, GameEventTypeEnum, ResponseTypeEnum } from 'shared';

export interface ResponseEvent {
  gameEventType: GameEventTypeEnum;
  responseType: ResponseTypeEnum;
  priority?: number;
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
