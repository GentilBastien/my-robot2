import {
  RequestAddEffectStateEvent,
  RequestDamageStateEvent,
  RequestHeatStateEvent,
  RequestHpStateEvent,
  RequestManaStateEvent,
  RequestMovementStateEvent,
  RequestPathStateEvent,
  RequestRemoveEffectStateEvent,
  RequestResourcesStateEvent,
  RequestRobotDestroyedStateEvent,
  RequestStateEvent,
  RequestStepPathStateEvent,
  RequestTurnEndStateEvent,
  RequestTurnStartStateEvent,
} from '@events/request-state.event';
import {
  AddEffectResponseStateEvent,
  MovementResponseStateEvent,
  PathResponseStateEvent,
  ResourcesResponseStateEvent,
  ResponseStateEvent,
  RobotDestroyedResponseStateEvent,
  StepPathResponseStateEvent,
  TurnEndResponseStateEvent,
  TurnStartResponseStateEvent,
} from '@events/response-state.event';
import { GameEventTypeEnum, GameState } from 'shared';
import { GameCalculator } from '@game/game-calculator/game.calculator';
import { turnStartRequestStateCase } from '@resolvers-request/turn-start.request-state-case';
import { turnEndRequestStateCase } from '@resolvers-request/turn-end.request-state-case';
import { pathRequestStateCase } from '@resolvers-request/path.request-state-case';
import { stepPathRequestStateCase } from '@resolvers-request/step-path.request-state-case';
import { resourcesRequestStateCase } from '@resolvers-request/resources.request-state-case';
import { addEffectRequestStateCase } from '@resolvers-request/add-effect.request-state-case';
import { removeEffectRequestStateCase } from '@resolvers-request/remove-effect.request-state-case';
import { actionRequestStateCase } from '@resolvers-request/action.request-state-case';
import { RequestActionStateEvent } from '@events/request-action-state.event';
import { manaRequestStateCase } from '@resolvers-request/mana.request-state-case';
import { hpRequestStateCase } from '@resolvers-request/hp.request-state-case';
import { heatRequestStateCase } from '@resolvers-request/heat.request-state-case';
import { damageRequestStateCase } from '@resolvers-request/damage.request-state-case';
import { robotDestroyedRequestStateCase } from '@resolvers-request/robot-destroyed.request-state-case';
import { movementRequestStateCase } from '@resolvers-request/movement.request-state-case';

export function requestStateEventResolver(
  gameCalculator: GameCalculator,
  readonlyGameState: Readonly<GameState>,
  requestEvent: RequestStateEvent
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
    case GameEventTypeEnum.ROBOT_DESTROYED: {
      const robotDestroyedResponseStateEvent: RobotDestroyedResponseStateEvent = robotDestroyedRequestStateCase(
        requestEvent as RequestRobotDestroyedStateEvent
      );
      return [robotDestroyedResponseStateEvent];
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
    case GameEventTypeEnum.MOVEMENT: {
      const movementResponseStateEvent: MovementResponseStateEvent = movementRequestStateCase(
        requestEvent as RequestMovementStateEvent
      );
      return [movementResponseStateEvent];
    }
    case GameEventTypeEnum.RESOURCES: {
      const resourcesResponseStateEvent: ResourcesResponseStateEvent = resourcesRequestStateCase(
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
    case GameEventTypeEnum.HP: {
      const mana = hpRequestStateCase(requestEvent as RequestHpStateEvent);
      return [mana];
    }
    case GameEventTypeEnum.MANA: {
      const mana = manaRequestStateCase(requestEvent as RequestManaStateEvent);
      return [mana];
    }
    case GameEventTypeEnum.HEAT: {
      const overheating = heatRequestStateCase(requestEvent as RequestHeatStateEvent);
      return [overheating];
    }
    case GameEventTypeEnum.ACTION: {
      return actionRequestStateCase(gameCalculator, readonlyGameState, requestEvent as RequestActionStateEvent);
    }
    case GameEventTypeEnum.DAMAGE: {
      const damageResponse = damageRequestStateCase(
        gameCalculator,
        readonlyGameState,
        requestEvent as RequestDamageStateEvent
      );
      return [damageResponse];
    }

    //...
    default:
      throw new Error('RequestEventResolver, unknown gameEventType');
  }
}
