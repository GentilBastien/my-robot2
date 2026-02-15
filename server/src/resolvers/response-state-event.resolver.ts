import {
  AdvanceTurnResponseStateEvent,
  ResponseStateEvent,
  StartTurnResponseStateEvent,
} from '@events/response-state.event';
import { PriorityListStructure } from '@structures/priority-list/priority-list.structure';
import { RequestStateEvent } from '@events/request-state.event';
import { GameCalculator } from '../game/game-calculator/game.calculator';
import { GameEventTypeEnum, GameState, Reducer, ResponseTypeEnum } from 'shared';
import { turnStartResponseStateCase } from '@resolvers/response-state-cases/turn-start.response-state-case';
import { advanceTurnResponseStateCase } from '@resolvers/response-state-cases/advance-turn.response-state-case';

export class ResponseStateEventResolver {
  public static resolve(
    gameCalculator: GameCalculator,
    readonlyGameState: Readonly<GameState>,
    responseEvent: ResponseStateEvent,
    pendingGameEvents: PriorityListStructure<RequestStateEvent>
  ): Reducer {
    if (responseEvent.responseType === ResponseTypeEnum.VALID) {
      switch (responseEvent.gameEventType) {
        case GameEventTypeEnum.TURN_START: {
          return turnStartResponseStateCase(
            gameCalculator,
            readonlyGameState,
            responseEvent as StartTurnResponseStateEvent,
            pendingGameEvents
          );
        }
        case GameEventTypeEnum.ADVANCE_TURN: {
          return advanceTurnResponseStateCase(gameCalculator, responseEvent as AdvanceTurnResponseStateEvent);
        }
        default:
          throw new Error('ResponseEventResolver, unknown gameEventType');
      }
    } else {
      // response is invalid
      return state => state;
    }
  }
}
