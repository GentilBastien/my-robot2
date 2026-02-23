import { RequestTurnStartStateEvent } from '@events/request-state.event';
import { GameEventTypeEnum } from 'shared';
import { GameEvent } from '@events/game.event';

export function turnStartGameCase(gameEvent: GameEvent): RequestTurnStartStateEvent {
  return {
    gameEventType: GameEventTypeEnum.TURN_START,
    sourceRobotId: gameEvent.sourceRobotId,
    priority: 3,
  };
}
