import {
  RequestAdvanceTurnStateEvent,
  RequestStateEvent,
  RequestTurnStartStateEvent,
} from '@events/request-state.event';
import { GameEventTypeEnum } from 'shared';
import { GameEvent } from '@events/game.event';

export function advanceTurnGameCase(gameEvent: GameEvent): RequestStateEvent {
  const requestAdvanceTurnEvent: RequestAdvanceTurnStateEvent = {
    gameEventType: GameEventTypeEnum.ADVANCE_TURN,
    sourceRobotId: gameEvent.sourceRobotId,
    priority: 2,
  };
  const requestTurnStartStateEvent: RequestTurnStartStateEvent = {
    gameEventType: GameEventTypeEnum.TURN_START,
    sourceRobotId: gameEvent.sourceRobotId,
    priority: 3,
  };
  return [requestAdvanceTurnEvent, requestTurnStartStateEvent];
}
