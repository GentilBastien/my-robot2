import { ActionEventTypeEnum, GameEventTypeEnum, PathCoordinate } from 'shared';

export interface GameEvent {
  gameEventType: GameEventTypeEnum;
  actionEventTypeEnum?: ActionEventTypeEnum;
  sourceRobotId: string;
}

export interface MovementGameEvent extends GameEvent {
  gameEventType: GameEventTypeEnum.MOVEMENT;
  path: PathCoordinate;
}
