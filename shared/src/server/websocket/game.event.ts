import { GameEventTypeEnum } from '../../enums/game-event-type.enum';
import { ActionTypeEnum } from '../../enums/action-type.enum';
import { MovementTypeEnum } from '../../enums/movement-type.enum';
import { Coordinates } from '../../types/coordinates';
import { ActionRequestEvent } from './actions.event';

export interface GameEvent {
  readonly gameEventType: GameEventTypeEnum;
  readonly actionTypeEnum?: ActionTypeEnum;
  readonly sourceRobotId: string;
}

export interface TurnEndGameEvent extends GameEvent {
  readonly gameEventType: GameEventTypeEnum.TURN_END;
}

export interface PathGameEvent extends GameEvent {
  readonly gameEventType: GameEventTypeEnum.PATH;
  readonly movementType: MovementTypeEnum;
  readonly path: Coordinates[];
}

export interface ActionGameEvent extends GameEvent {
  readonly gameEventType: GameEventTypeEnum.ACTION;
  readonly actionTypeEnum: ActionTypeEnum;
  readonly sourceRobotId: string;
  readonly actionRequestEvent: ActionRequestEvent;
}
