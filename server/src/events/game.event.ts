import { ActionEventTypeEnum, GameEventTypeEnum, MovementTypeEnum, PathCoordinate } from 'shared';

export interface GameEvent {
  gameEventType: GameEventTypeEnum;
  actionEventTypeEnum?: ActionEventTypeEnum;
  sourceRobotId: string;
}

export interface PathGameEvent extends GameEvent {
  gameEventType: GameEventTypeEnum.PATH;
  movementType: MovementTypeEnum;
  path: PathCoordinate;
}
