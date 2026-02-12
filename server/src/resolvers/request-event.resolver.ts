import { RequestAdvanceTurnEvent, RequestEvent } from '@events/request.event';
import { AdvanceTurnResponseEvent, ResponseEvent } from '@events/response.event';
import { PriorityListStructure } from '@structures/priority-list/priority-list.structure';
import { GameEventTypeEnum, GameState, ResponseTypeEnum } from 'shared';
import { GameCalculator } from '../game/game-calculator/game.calculator';

export class RequestEventResolver {
  public static resolve(
    gameCalculator: GameCalculator,
    readonlyGameState: Readonly<GameState>,
    requestEvent: RequestEvent,
    pendingRequestEvents: PriorityListStructure<RequestEvent>
  ): ResponseEvent {
    switch (requestEvent.gameEventType) {
      case GameEventTypeEnum.ADVANCE_TURN: {
        const requestAdvanceTurnEvent: RequestAdvanceTurnEvent = requestEvent as RequestAdvanceTurnEvent;
        const allowed = gameCalculator.canAdvanceTurn(readonlyGameState, requestAdvanceTurnEvent.sourceRobotId);
        const newTurnState = gameCalculator.newTurnState(readonlyGameState);
        return {
          gameEventType: GameEventTypeEnum.ADVANCE_TURN,
          responseType: allowed ? ResponseTypeEnum.VALID : ResponseTypeEnum.INVALID,
          turnNumber: newTurnState.currentTurnNumber,
          turnRobotId: newTurnState.currentTurnRobot.id,
        } as AdvanceTurnResponseEvent;
      }
      //...
      default:
        throw new Error('RequestEventResolver, unknown gameEventType');
    }
  }
}
