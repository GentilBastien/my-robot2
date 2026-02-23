import { RequestAdvanceTurnStateEvent, RequestStateEvent, RequestTurnEndStateEvent } from '@events/request-state.event';
import { GameEventTypeEnum } from 'shared';
import { GameEvent } from '@events/game.event';

export function turnEndGameCase(gameEvent: GameEvent): RequestStateEvent[] {
  const requestTurnEndStateEvent: RequestTurnEndStateEvent = {
    gameEventType: GameEventTypeEnum.TURN_END,
    sourceRobotId: gameEvent.sourceRobotId,
    priority: 1,
  };
  const requestAdvanceTurnEvent: RequestAdvanceTurnStateEvent = {
    gameEventType: GameEventTypeEnum.ADVANCE_TURN,
    sourceRobotId: gameEvent.sourceRobotId,
    priority: 2,
  };
  return [requestTurnEndStateEvent, requestAdvanceTurnEvent];
}
