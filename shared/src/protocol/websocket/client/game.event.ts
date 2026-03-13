import { GameEventTypeEnum } from '../../../enums/game-event-type.enum';
import { ActionTypeEnum } from '../../../enums/action-type.enum';
import { MovementTypeEnum } from '../../../enums/movement-type.enum';
import { PathCoordinate } from '../../../types/path-coordinate';

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
