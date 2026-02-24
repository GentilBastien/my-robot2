import { PathResponseStateEvent } from '@events/response-state.event';
import { RequestStateEvent, RequestStepPathStateEvent } from '@events/request-state.event';
import { GameEventTypeEnum, GameState, MovementTypeEnum, PathCoordinate, Reducer, StepPathCoordinate } from 'shared';
import { GameCalculator } from '../../game/game-calculator/game.calculator';
import { PriorityListStructure } from '@structures/priority-list/priority-list.structure';

export function pathResponseStateCase(
  gameCalculator: GameCalculator,
  readonlyGameState: Readonly<GameState>,
  pathResponseStateEvent: PathResponseStateEvent,
  pendingGameEvents: PriorityListStructure<RequestStateEvent>
): Reducer {
  const basePriorityMovement = 10;
  switch (pathResponseStateEvent.movementType) {
    case MovementTypeEnum.JUMPED:
    case MovementTypeEnum.TELEPORTED: {
      const stepPath: RequestStepPathStateEvent = {
        gameEventType: GameEventTypeEnum.STEP_PATH,
        movementType: pathResponseStateEvent.movementType,
        sourceRobotId: pathResponseStateEvent.sourceRobotId,
        priority: basePriorityMovement,
        stepPath: {
          startCoordinates: pathResponseStateEvent.path.coordinatesPath[0],
          endCoordinates: pathResponseStateEvent.path.coordinatesPath[1],
          cost: pathResponseStateEvent.path.costs[1],
        },
      };
      pendingGameEvents.add(stepPath);
      break;
    }
    case MovementTypeEnum.HOVERED:
    case MovementTypeEnum.WALKED:
    default: {
      const path: PathCoordinate = pathResponseStateEvent.path;
      for (let i = 0; i < path.coordinatesPath.length - 1; i++) {
        const startCoordinates = path.coordinatesPath[i];
        const endCoordinates = path.coordinatesPath[i + 1];
        const stepCost = path.costs[i + 1];
        const stepPathCoordinate: StepPathCoordinate = {
          startCoordinates,
          endCoordinates,
          cost: stepCost,
        };
        const requestStepMoveStateEvent: RequestStepPathStateEvent = {
          gameEventType: GameEventTypeEnum.STEP_PATH,
          movementType: pathResponseStateEvent.movementType,
          priority: basePriorityMovement + i,
          sourceRobotId: pathResponseStateEvent.sourceRobotId,
          stepPath: stepPathCoordinate,
        };
        pendingGameEvents.add(requestStepMoveStateEvent);
      }
    }
  }
  return state => state;
}
