import { AdvanceTurnResponseEvent, ResponseEvent } from '@events/response.event';
import { PriorityListStructure } from '@structures/priority-list/priority-list.structure';
import { RequestEvent } from '@events/request.event';
import { GameCalculator } from '../game/game-calculator/game.calculator';
import { GameEventTypeEnum, GameState, Reducer, ResponseTypeEnum } from 'shared';
import { turnAdvanceReducer } from '../reducers/turn.reducer';

export class ResponseEventResolver {
  public static resolve(
    gameCalculator: GameCalculator,
    readonlyGameState: Readonly<GameState>,
    responseEvent: ResponseEvent,
    pendingGameEvents: PriorityListStructure<RequestEvent>
  ): Reducer {
    switch (responseEvent.gameEventType) {
      case GameEventTypeEnum.ADVANCE_TURN: {
        const responseAdvanceTurnEvent = responseEvent as AdvanceTurnResponseEvent;
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
