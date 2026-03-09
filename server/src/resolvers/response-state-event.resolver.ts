import {
  AddEffectResponseStateEvent,
  AdvanceTurnResponseStateEvent,
  DamageResponseStateEvent,
  HeatResponseStateEvent,
  HpResponseStateEvent,
  ManaResponseStateEvent,
  PathResponseStateEvent,
  RemoveEffectResponseStateEvent,
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
import { removeEffectResponseStateCase } from '@resolvers-response/remove-effect.response-state-case';
import { manaResponseStateCase } from '@resolvers-response/mana.response-state-case';
import { hpResponseStateCase } from '@resolvers-response/hp.response-state-case';
import { heatResponseStateCase } from '@resolvers-response/heat.response-state-case';
import { damageResponseStateCase } from '@resolvers-response/damage.response-state-case';

export function responseStateEventResolver(
  gameCalculator: GameCalculator,
  readonlyGameState: Readonly<GameState>,
  responseEvent: ResponseStateEvent,
  pendingRequestEvents: PriorityListStructure<RequestStateEvent>
): Reducer | null {
  if (responseEvent.responseValidated) {
    switch (responseEvent.gameEventType) {
      case GameEventTypeEnum.TURN_START: {
        return turnStartResponseStateCase(
          gameCalculator,
          readonlyGameState,
          responseEvent as TurnStartResponseStateEvent,
          pendingRequestEvents
        );
      }
      case GameEventTypeEnum.TURN_END: {
        return turnEndResponseStateCase(
          gameCalculator,
          readonlyGameState,
          responseEvent as TurnEndResponseStateEvent,
          pendingRequestEvents
        );
      }
      case GameEventTypeEnum.ADVANCE_TURN: {
        return advanceTurnResponseStateCase(
          gameCalculator,
          responseEvent as AdvanceTurnResponseStateEvent,
          pendingRequestEvents
        );
      }
      case GameEventTypeEnum.PATH: {
        pathResponseStateCase(
          gameCalculator,
          readonlyGameState,
          responseEvent as PathResponseStateEvent,
          pendingRequestEvents
        );
        return null;
      }
      case GameEventTypeEnum.STEP_PATH: {
        return stepPathResponseStateCase(
          gameCalculator,
          readonlyGameState,
          responseEvent as StepPathResponseStateEvent,
          pendingRequestEvents
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
          pendingRequestEvents
        );
      }
      case GameEventTypeEnum.REMOVE_EFFECT: {
        return removeEffectResponseStateCase(
          gameCalculator,
          readonlyGameState,
          responseEvent as RemoveEffectResponseStateEvent,
          pendingRequestEvents
        );
      }
      case GameEventTypeEnum.HP: {
        return hpResponseStateCase(gameCalculator, readonlyGameState, responseEvent as HpResponseStateEvent);
      }
      case GameEventTypeEnum.MANA: {
        return manaResponseStateCase(gameCalculator, readonlyGameState, responseEvent as ManaResponseStateEvent);
      }
      case GameEventTypeEnum.HEAT: {
        return heatResponseStateCase(gameCalculator, readonlyGameState, responseEvent as HeatResponseStateEvent);
      }
      case GameEventTypeEnum.DAMAGE: {
        return damageResponseStateCase(gameCalculator, readonlyGameState, responseEvent as DamageResponseStateEvent);
      }
      default:
        throw new Error('ResponseEventResolver, unknown gameEventType');
    }
  } else {
    // response is invalid
    return state => state;
  }
}
