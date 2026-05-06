import { PathResponseStateEvent } from '@events/response-state.event';
import { RequestStateEvent, RequestStepPathStateEvent } from '@events/request-state.event';
import { GameEventTypeEnum, GameState, MovementTypeEnum, PathCostCoordinate, StepPathCostCoordinate } from 'shared';
import { GameCalculator } from '@game/game-calculator/game.calculator';
import { PriorityListStructure } from '@structures/priority-list/priority-list.structure';

export function pathResponseStateCase(
  gameCalculator: GameCalculator,
  readonlyGameState: Readonly<GameState>,
  pathResponseStateEvent: PathResponseStateEvent,
  pendingRequestEvents: PriorityListStructure<RequestStateEvent>
): void {
  const basePriorityMovement = 10;
  switch (pathResponseStateEvent.movementType) {
    case MovementTypeEnum.JUMPED:
    case MovementTypeEnum.TELEPORTED: {
      const pathCoordinate: PathCostCoordinate = pathResponseStateEvent.path;
      const pathCoordsAsOneStep: StepPathCostCoordinate | undefined =
        gameCalculator.pathCoordinateIsOneStep(pathCoordinate);
      if (pathCoordsAsOneStep) {
        const stepPath: RequestStepPathStateEvent = {
          gameEventType: GameEventTypeEnum.STEP_PATH,
          movementType: pathResponseStateEvent.movementType,
          sourceRobotId: pathResponseStateEvent.sourceRobotId,
          priority: basePriorityMovement,
          stepPath: pathCoordsAsOneStep,
        };
        pendingRequestEvents.add(stepPath);
      }
      break;
    }
    case MovementTypeEnum.HOVERED:
    case MovementTypeEnum.WALKED:
    default: {
      const steps: StepPathCostCoordinate[] = gameCalculator.splitPathInSteps(pathResponseStateEvent.path);
      const requestStepPathStateEvents: RequestStepPathStateEvent[] = steps.map(
        (stepPath, index): RequestStepPathStateEvent => ({
          gameEventType: GameEventTypeEnum.STEP_PATH,
          movementType: pathResponseStateEvent.movementType,
          priority: basePriorityMovement + index,
          sourceRobotId: pathResponseStateEvent.sourceRobotId,
          stepPath,
        })
      );
      pendingRequestEvents.addAll(requestStepPathStateEvents);
    }
  }
}
