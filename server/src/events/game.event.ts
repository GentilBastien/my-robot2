import { ActionEventTypeEnum, GameEventTypeEnum, MovementTypeEnum, PathCoordinate } from 'shared';

export interface GameEvent {
  gameEventType: GameEventTypeEnum;
  actionEventTypeEnum?: ActionEventTypeEnum;
  sourceRobotId: string;
}

export interface MovementGameEvent extends GameEvent {
  gameEventType: GameEventTypeEnum.MOVEMENT;
  movementType: MovementTypeEnum;
  path: PathCoordinate;
}
