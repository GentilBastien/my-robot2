import {
  AddEffectResponseStateEvent,
  AdvanceTurnResponseStateEvent,
  PathResponseStateEvent,
  ResourcesResponseStateEvent,
  ResponseStateEvent,
  StepPathResponseStateEvent,
  TurnEndResponseStateEvent,
  TurnStartResponseStateEvent,
} from '@events/response-state.event';
import { PriorityListStructure } from '@structures/priority-list/priority-list.structure';
import { RequestStateEvent } from '@events/request-state.event';
import { GameCalculator } from '../game/game-calculator/game.calculator';
import { GameEventTypeEnum, GameState, Reducer } from 'shared';
import { turnStartResponseStateCase } from '@resolvers-response/turn-start.response-state-case';
import { turnEndResponseStateCase } from '@resolvers-response/turn-end.response-state-case';
import { advanceTurnResponseStateCase } from '@resolvers-response/advance-turn.response-state-case';
import { pathResponseStateCase } from '@resolvers-response/path.response-state-case';
import { stepPathResponseStateCase } from '@resolvers-response/step-path.response-state-case';
import { resourcesResponseStateCase } from '@resolvers-response/resources.response-state-case';
import { addEffectResponseStateCase } from '@resolvers-response/add-effect.response-state-case';

export function responseStateEventResolver(
  gameCalculator: GameCalculator,
  readonlyGameState: Readonly<GameState>,
  responseEvent: ResponseStateEvent,
  pendingGameEvents: PriorityListStructure<RequestStateEvent>
): Reducer | null {
  if (responseEvent.responseValidated) {
    switch (responseEvent.gameEventType) {
      case GameEventTypeEnum.TURN_START: {
        return turnStartResponseStateCase(
          gameCalculator,
          readonlyGameState,
          responseEvent as TurnStartResponseStateEvent,
          pendingGameEvents
        );
      }
      case GameEventTypeEnum.TURN_END: {
        return turnEndResponseStateCase(
          gameCalculator,
          readonlyGameState,
          responseEvent as TurnEndResponseStateEvent,
          pendingGameEvents
        );
      }
      case GameEventTypeEnum.ADVANCE_TURN: {
        return advanceTurnResponseStateCase(
          gameCalculator,
          responseEvent as AdvanceTurnResponseStateEvent,
          pendingGameEvents
        );
      }
      case GameEventTypeEnum.PATH: {
        pathResponseStateCase(
          gameCalculator,
          readonlyGameState,
          responseEvent as PathResponseStateEvent,
          pendingGameEvents
        );
        return null;
      }
      case GameEventTypeEnum.STEP_PATH: {
        return stepPathResponseStateCase(
          gameCalculator,
          readonlyGameState,
          responseEvent as StepPathResponseStateEvent,
          pendingGameEvents
        );
      }
      case GameEventTypeEnum.RESOURCES: {
        return resourcesResponseStateCase(
          gameCalculator,
          readonlyGameState,
          responseEvent as ResourcesResponseStateEvent
        );
      }
      case GameEventTypeEnum.ADD_EFFECT: {
        return addEffectResponseStateCase(
          gameCalculator,
          readonlyGameState,
          responseEvent as AddEffectResponseStateEvent,
          pendingGameEvents
        );
      }
      default:
        throw new Error('ResponseEventResolver, unknown gameEventType');
    }
  } else {
    // response is invalid
    return state => state;
  }
}
