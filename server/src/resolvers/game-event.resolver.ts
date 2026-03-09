import { RequestStateEvent } from '@events/request-state.event';
import { GameEventTypeEnum } from 'shared';
import { ActionGameEvent, GameEvent, PathGameEvent } from '@events/game.event';
import { turnEndGameCase } from '@resolvers/game-cases/turn-end.game-case';
import { pathGameCase } from '@resolvers/game-cases/path.game-case';
import { actionGameCase } from '@resolvers/game-cases/action.game-case';

export function gameEventResolver(gameEvent: GameEvent): RequestStateEvent {
  switch (gameEvent.gameEventType) {
    case GameEventTypeEnum.TURN_END: {
      return turnEndGameCase(gameEvent);
    }
    case GameEventTypeEnum.PATH:
    case GameEventTypeEnum.STEP_PATH: {
      return pathGameCase(gameEvent as PathGameEvent);
    }
    case GameEventTypeEnum.ACTION: {
      return actionGameCase(gameEvent as ActionGameEvent);
    }
    default:
      throw new Error(`GameEventResolver, this gameEventType should not be resolved ${gameEvent.gameEventType}`);
  }
}
