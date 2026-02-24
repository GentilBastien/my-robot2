import { RequestStateEvent } from '@events/request-state.event';
import { GameEventTypeEnum } from 'shared';
import { GameEvent } from '@events/game.event';

export function advanceTurnGameCase(gameEvent: GameEvent): RequestStateEvent {
  return {
    gameEventType: GameEventTypeEnum.ADVANCE_TURN,
    sourceRobotId: gameEvent.sourceRobotId,
  };
}
