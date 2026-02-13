import { AdvanceTurnResponseStateEvent, ResponseStateEvent } from '@events/response-state.event';
import { PriorityListStructure } from '@structures/priority-list/priority-list.structure';
import { RequestStateEvent } from '@events/request-state.event';
import { GameCalculator } from '../game/game-calculator/game.calculator';
import { GameEventTypeEnum, GameState, Reducer, ResponseTypeEnum } from 'shared';
import { turnAdvanceReducer } from '../reducers/turn.reducer';

export class ResponseStateEventResolver {
  public static resolve(
    gameCalculator: GameCalculator,
    readonlyGameState: Readonly<GameState>,
    responseEvent: ResponseStateEvent,
    pendingGameEvents: PriorityListStructure<RequestStateEvent>
  ): Reducer {
    switch (responseEvent.gameEventType) {
      case GameEventTypeEnum.ADVANCE_TURN: {
        const responseAdvanceTurnEvent = responseEvent as AdvanceTurnResponseStateEvent;
        if (responseAdvanceTurnEvent.responseType === ResponseTypeEnum.VALID) {
          gameCalculator.advanceTurn();
        }
        return turnAdvanceReducer(responseAdvanceTurnEvent.turnNumber, responseAdvanceTurnEvent.turnRobotId);
      }
      default:
        throw new Error('ResponseEventResolver, unknown gameEventType');
    }
  }
}
