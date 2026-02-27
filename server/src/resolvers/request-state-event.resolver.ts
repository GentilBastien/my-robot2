import {
  RequestAdvanceTurnStateEvent,
  RequestPathStateEvent,
  RequestResourcesStateEvent,
  RequestStateEvent,
  RequestStepPathStateEvent,
  RequestTurnEndStateEvent,
  RequestTurnStartStateEvent,
} from '@events/request-state.event';
import { ResponseStateEvent } from '@events/response-state.event';
import { GameEventTypeEnum, GameState } from 'shared';
import { GameCalculator } from '../game/game-calculator/game.calculator';
import { turnStartRequestStateCase } from '@resolvers/request-state-cases/turn-start.request-state-case';
import { advanceTurnRequestStateCase } from '@resolvers/request-state-cases/advance-turn.request-state-case';
import { turnEndRequestStateCase } from '@resolvers/request-state-cases/turn-end.request-state-case';
import { pathRequestStateCase } from '@resolvers/request-state-cases/path.request-state-case';
import { stepPathRequestStateCase } from '@resolvers/request-state-cases/step-path.request-state-case';
import { resourcesRequestStateCase } from '@resolvers/request-state-cases/resources.request-state-case';

export function requestStateEventResolver(
  gameCalculator: GameCalculator,
  readonlyGameState: Readonly<GameState>,
  requestEvent: RequestStateEvent
  // pendingRequestEvents: PriorityListStructure<RequestStateEvent>
): ResponseStateEvent {
  switch (requestEvent.gameEventType) {
    case GameEventTypeEnum.TURN_START: {
      return turnStartRequestStateCase(gameCalculator, readonlyGameState, requestEvent as RequestTurnStartStateEvent);
    }
    case GameEventTypeEnum.TURN_END: {
      return turnEndRequestStateCase(gameCalculator, readonlyGameState, requestEvent as RequestTurnEndStateEvent);
    }
    case GameEventTypeEnum.ADVANCE_TURN: {
      return advanceTurnRequestStateCase(
        gameCalculator,
        readonlyGameState,
        requestEvent as RequestAdvanceTurnStateEvent
      );
    }
    case GameEventTypeEnum.PATH: {
      return pathRequestStateCase(gameCalculator, readonlyGameState, requestEvent as RequestPathStateEvent);
    }
    case GameEventTypeEnum.STEP_PATH: {
      return stepPathRequestStateCase(gameCalculator, readonlyGameState, requestEvent as RequestStepPathStateEvent);
    }
    case GameEventTypeEnum.RESOURCES: {
      return resourcesRequestStateCase(gameCalculator, readonlyGameState, requestEvent as RequestResourcesStateEvent);
    }

    //...
    default:
      throw new Error('RequestEventResolver, unknown gameEventType');
  }
}
