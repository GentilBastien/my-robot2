import { ActionTypeEnum, GameEventTypeEnum, MovementTypeEnum, PathCoordinate } from 'shared';

export interface GameEvent {
  gameEventType: GameEventTypeEnum;
  actionTypeEnum?: ActionTypeEnum;
  sourceRobotId: string;
}

export interface PathGameEvent extends GameEvent {
  gameEventType: GameEventTypeEnum.PATH;
  movementType: MovementTypeEnum;
  path: PathCoordinate;
}

export interface ActionGameEvent extends GameEvent {
  gameEventType: GameEventTypeEnum.ACTION;
  actionTypeEnum: ActionTypeEnum;
  data: Record<string, string>;
}
