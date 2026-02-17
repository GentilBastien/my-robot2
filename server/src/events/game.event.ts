import { ActionEventTypeEnum, Coordinates, GameEventTypeEnum } from 'shared';

export interface GameEvent {
  gameEventType: GameEventTypeEnum;
  actionEventTypeEnum?: ActionEventTypeEnum;
  sourceRobotId: string;
}

export interface MovementGameEvent extends GameEvent {
  gameEventType: GameEventTypeEnum.MOVEMENT;
  target: Coordinates;
}
