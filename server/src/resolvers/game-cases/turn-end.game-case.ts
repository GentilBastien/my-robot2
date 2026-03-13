import { RequestStateEvent } from '@events/request-state.event';
import { GameEvent, GameEventTypeEnum } from 'shared';

export function turnEndGameCase(gameEvent: GameEvent): RequestStateEvent {
  return {
    gameEventType: GameEventTypeEnum.TURN_END,
    sourceRobotId: gameEvent.sourceRobotId,
  };
}
