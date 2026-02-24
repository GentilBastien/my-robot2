import { RequestStateEvent } from '@events/request-state.event';
import { GameEventTypeEnum } from 'shared';
import { GameEvent } from '@events/game.event';

export function turnEndGameCase(gameEvent: GameEvent): RequestStateEvent {
  return {
    gameEventType: GameEventTypeEnum.TURN_END,
    sourceRobotId: gameEvent.sourceRobotId,
  };
}
