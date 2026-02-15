import {
  RequestAdvanceTurnStateEvent,
  RequestStateEvent,
  RequestTurnStartStateEvent,
} from '@events/request-state.event';
import { ResponseStateEvent } from '@events/response-state.event';
import { PriorityListStructure } from '@structures/priority-list/priority-list.structure';
import { GameEventTypeEnum, GameState } from 'shared';
import { GameCalculator } from '../game/game-calculator/game.calculator';
import { turnStartRequestStateCase } from '@resolvers/request-state-cases/turn-start.request-state-case';
import { advanceTurnRequestStateCase } from '@resolvers/request-state-cases/advance-turn.request-state-case';

export class RequestStateEventResolver {
  public static resolve(
    gameCalculator: GameCalculator,
    readonlyGameState: Readonly<GameState>,
    requestEvent: RequestStateEvent,
    pendingRequestEvents: PriorityListStructure<RequestStateEvent>
  ): ResponseStateEvent {
    switch (requestEvent.gameEventType) {
      case GameEventTypeEnum.TURN_START: {
        return turnStartRequestStateCase(gameCalculator, readonlyGameState, requestEvent as RequestTurnStartStateEvent);
      }
      case GameEventTypeEnum.ADVANCE_TURN: {
        return advanceTurnRequestStateCase(
          gameCalculator,
          readonlyGameState,
          requestEvent as RequestAdvanceTurnStateEvent
        );
      }
      //...
      default:
        throw new Error('RequestEventResolver, unknown gameEventType');
    }
  }
}
