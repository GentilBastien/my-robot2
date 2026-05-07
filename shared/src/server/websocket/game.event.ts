import { GameEventTypeEnum } from '../../enums/game-event-type.enum';
import { ActionTypeEnum } from '../../enums/action-type.enum';
import { MovementTypeEnum } from '../../enums/movement-type.enum';
import { Coordinates } from '../../types/coordinates';

export interface GameEvent {
  gameEventType: GameEventTypeEnum;
  actionTypeEnum?: ActionTypeEnum;
  sourceRobotId: string;
}

export interface TurnEndGameEvent extends GameEvent {
  gameEventType: GameEventTypeEnum.TURN_END;
}

export interface PathGameEvent extends GameEvent {
  gameEventType: GameEventTypeEnum.PATH;
  movementType: MovementTypeEnum;
  path: Coordinates[];
}

export interface ActionGameEvent extends GameEvent {
  gameEventType: GameEventTypeEnum.ACTION;
  actionTypeEnum: ActionTypeEnum;
  data: Record<string, string>;
}
