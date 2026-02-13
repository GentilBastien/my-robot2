import { ActionEventTypeEnum, GameEventTypeEnum } from 'shared';

export interface GameEvent {
  gameEventType: GameEventTypeEnum;
  actionEventTypeEnum?: ActionEventTypeEnum;
  sourceRobotId: string;
}
