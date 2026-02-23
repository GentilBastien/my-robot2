import {
  RequestAdvanceTurnStateEvent,
  RequestEndTurnResourcesStateEvent,
  RequestStateEvent,
  RequestTurnEndStateEvent,
} from '@events/request-state.event';
import { GameEventTypeEnum } from 'shared';
import { GameEvent } from '@events/game.event';

export function turnEndGameCase(gameEvent: GameEvent): RequestStateEvent {
  const requestTurnEndStateEvent: RequestTurnEndStateEvent = {
    gameEventType: GameEventTypeEnum.TURN_END,
    sourceRobotId: gameEvent.sourceRobotId,
    priority: 1,
  };

  const requestEndTurnResourcesStateEvent: RequestEndTurnResourcesStateEvent = {
    priority: 2,
  };

  const requestAdvanceTurnEvent: RequestAdvanceTurnStateEvent = {
    gameEventType: GameEventTypeEnum.ADVANCE_TURN,
    sourceRobotId: gameEvent.sourceRobotId,
    priority: 3,
  };
  return [requestTurnEndStateEvent, requestAdvanceTurnEvent];
}
