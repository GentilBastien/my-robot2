import {
  RequestAddEffectStateEvent,
  RequestAdvanceTurnStateEvent,
  RequestManaStateEvent,
  RequestPathStateEvent,
  RequestRemoveEffectStateEvent,
  RequestResourcesStateEvent,
  RequestStateEvent,
  RequestStepPathStateEvent,
  RequestTurnEndStateEvent,
  RequestTurnStartStateEvent,
} from '@events/request-state.event';
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
import { GameEventTypeEnum, GameState } from 'shared';
import { GameCalculator } from '../game/game-calculator/game.calculator';
import { turnStartRequestStateCase } from '@resolvers-request/turn-start.request-state-case';
import { turnEndRequestStateCase } from '@resolvers-request/turn-end.request-state-case';
import { advanceTurnRequestStateCase } from '@resolvers-request/advance-turn.request-state-case';
import { pathRequestStateCase } from '@resolvers-request/path.request-state-case';
import { stepPathRequestStateCase } from '@resolvers-request/step-path.request-state-case';
import { resourcesRequestStateCase } from '@resolvers-request/resources.request-state-case';
import { addEffectRequestStateCase } from '@resolvers-request/add-effect.request-state-case';
import { removeEffectRequestStateCase } from '@resolvers-request/remove-effect.request-state-case';
import { actionRequestStateCase } from '@resolvers-request/action.request-state-case';
import { RequestActionStateEvent } from '@events/request-action-state.event';
import { PriorityListStructure } from '@structures/priority-list/priority-list.structure';
import { manaRequestStateCase } from '@resolvers-request/mana.request-state-case';

export function requestStateEventResolver(
  gameCalculator: GameCalculator,
  readonlyGameState: Readonly<GameState>,
  requestEvent: RequestStateEvent,
  pendingRequestEvents: PriorityListStructure<RequestStateEvent>
): ResponseStateEvent[] {
  switch (requestEvent.gameEventType) {
    case GameEventTypeEnum.TURN_START: {
      const turnStartResponseStateEvent: TurnStartResponseStateEvent = turnStartRequestStateCase(
        gameCalculator,
        readonlyGameState,
        requestEvent as RequestTurnStartStateEvent
      );
      return [turnStartResponseStateEvent];
    }
    case GameEventTypeEnum.TURN_END: {
      const turnEndResponseStateEvent: TurnEndResponseStateEvent = turnEndRequestStateCase(
        gameCalculator,
        readonlyGameState,
        requestEvent as RequestTurnEndStateEvent
      );
      return [turnEndResponseStateEvent];
    }
    case GameEventTypeEnum.ADVANCE_TURN: {
      const advanceTurnResponseStateEvent: AdvanceTurnResponseStateEvent = advanceTurnRequestStateCase(
        gameCalculator,
        readonlyGameState,
        requestEvent as RequestAdvanceTurnStateEvent
      );
      return [advanceTurnResponseStateEvent];
    }
    case GameEventTypeEnum.PATH: {
      const pathResponseStateEvent: PathResponseStateEvent = pathRequestStateCase(
        gameCalculator,
        readonlyGameState,
        requestEvent as RequestPathStateEvent
      );
      return [pathResponseStateEvent];
    }
    case GameEventTypeEnum.STEP_PATH: {
      const stepPathResponseStateEvent: StepPathResponseStateEvent = stepPathRequestStateCase(
        gameCalculator,
        readonlyGameState,
        requestEvent as RequestStepPathStateEvent
      );
      return [stepPathResponseStateEvent];
    }
    case GameEventTypeEnum.RESOURCES: {
      const resourcesResponseStateEvent: ResourcesResponseStateEvent = resourcesRequestStateCase(
        gameCalculator,
        readonlyGameState,
        requestEvent as RequestResourcesStateEvent
      );
      return [resourcesResponseStateEvent];
    }
    case GameEventTypeEnum.ADD_EFFECT: {
      const addEffectResponseStateEvent: AddEffectResponseStateEvent = addEffectRequestStateCase(
        requestEvent as RequestAddEffectStateEvent
      );
      return [addEffectResponseStateEvent];
    }
    case GameEventTypeEnum.REMOVE_EFFECT: {
      const removeEffectResponseStateEvent = removeEffectRequestStateCase(
        requestEvent as RequestRemoveEffectStateEvent
      );
      return [removeEffectResponseStateEvent];
    }
    case GameEventTypeEnum.MANA: {
      const mana = manaRequestStateCase(requestEvent as RequestManaStateEvent);
      return [mana];
    }
    case GameEventTypeEnum.ACTION: {
      return actionRequestStateCase(gameCalculator, readonlyGameState, requestEvent as RequestActionStateEvent);
    }

    //...
    default:
      throw new Error('RequestEventResolver, unknown gameEventType');
  }
}
