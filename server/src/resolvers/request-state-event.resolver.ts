import {
  RequestAdvanceTurnStateEvent,
  RequestStateEvent,
  RequestTurnStartStateEvent,
} from '@events/request-state.event';
import {
  AdvanceTurnResponseStateEvent,
  ResponseStateEvent,
  StartTurnResponseStateEvent,
} from '@events/response-state.event';
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
      case GameEventTypeEnum.TURN_START: {
        const requestTurnStartStateEvent: RequestTurnStartStateEvent = requestEvent as RequestTurnStartStateEvent;
        const allowed = gameCalculator.isRobotTurn(readonlyGameState, requestTurnStartStateEvent.sourceRobotId);
        const turnNumber = gameCalculator.getTurnNumber(readonlyGameState);
        const turnRobotId = gameCalculator.getRobotPlayingId();
        return {
          gameEventType: GameEventTypeEnum.TURN_START,
          responseType: allowed ? ResponseTypeEnum.VALID : ResponseTypeEnum.INVALID,
          turnNumber,
          turnRobotId,
        } as StartTurnResponseStateEvent;
      }
      case GameEventTypeEnum.ADVANCE_TURN: {
        const requestAdvanceTurnEvent: RequestAdvanceTurnStateEvent = requestEvent as RequestAdvanceTurnStateEvent;
        const allowed = gameCalculator.isRobotTurn(readonlyGameState, requestAdvanceTurnEvent.sourceRobotId);
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
