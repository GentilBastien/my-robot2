import { RequestAdvanceTurnStateEvent, RequestStateEvent } from '@events/request-state.event';
import { AdvanceTurnResponseStateEvent, ResponseStateEvent } from '@events/response-state.event';
import { PriorityListStructure } from '@structures/priority-list/priority-list.structure';
import { GameEventTypeEnum, GameState, ResponseTypeEnum } from 'shared';
import { GameCalculator } from '../game/game-calculator/game.calculator';

export class RequestStateEventResolver {
  public static resolve(
    gameCalculator: GameCalculator,
    readonlyGameState: Readonly<GameState>,
    requestEvent: RequestStateEvent,
    pendingRequestEvents: PriorityListStructure<RequestStateEvent>
  ): ResponseStateEvent {
    switch (requestEvent.gameEventType) {
      case GameEventTypeEnum.ADVANCE_TURN: {
        const requestAdvanceTurnEvent: RequestAdvanceTurnStateEvent = requestEvent as RequestAdvanceTurnStateEvent;
        const allowed = gameCalculator.canAdvanceTurn(readonlyGameState, requestAdvanceTurnEvent.sourceRobotId);
        const newTurnState = gameCalculator.newTurnState(readonlyGameState);
        return {
          gameEventType: GameEventTypeEnum.ADVANCE_TURN,
          responseType: allowed ? ResponseTypeEnum.VALID : ResponseTypeEnum.INVALID,
          turnNumber: newTurnState.currentTurnNumber,
          turnRobotId: newTurnState.currentTurnRobot.id,
        } as AdvanceTurnResponseStateEvent;
      }
      //...
      default:
        throw new Error('RequestEventResolver, unknown gameEventType');
    }
  }
}
