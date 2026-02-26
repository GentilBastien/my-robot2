import { PathResponseStateEvent } from '@events/response-state.event';
import { RequestStateEvent, RequestStepPathStateEvent } from '@events/request-state.event';
import { GameEventTypeEnum, GameState, MovementTypeEnum, PathCoordinate, StepPathCoordinate } from 'shared';
import { GameCalculator } from '../../game/game-calculator/game.calculator';
import { PriorityListStructure } from '@structures/priority-list/priority-list.structure';

export function pathResponseStateCase(
  gameCalculator: GameCalculator,
  readonlyGameState: Readonly<GameState>,
  pathResponseStateEvent: PathResponseStateEvent,
  pendingGameEvents: PriorityListStructure<RequestStateEvent>
): void {
  const basePriorityMovement = 10;
  switch (pathResponseStateEvent.movementType) {
    case MovementTypeEnum.JUMPED:
    case MovementTypeEnum.TELEPORTED: {
      const pathCoordinate: PathCoordinate = pathResponseStateEvent.path;
      const pathCoordsAsOneStep: StepPathCoordinate | undefined =
        gameCalculator.pathCoordinateIsOneStep(pathCoordinate);
      if (pathCoordsAsOneStep) {
        const stepPath: RequestStepPathStateEvent = {
          gameEventType: GameEventTypeEnum.STEP_PATH,
          movementType: pathResponseStateEvent.movementType,
          sourceRobotId: pathResponseStateEvent.sourceRobotId,
          priority: basePriorityMovement,
          stepPath: pathCoordsAsOneStep,
        };
        pendingGameEvents.add(stepPath);
      }
      break;
    }
    case MovementTypeEnum.HOVERED:
    case MovementTypeEnum.WALKED:
    default: {
      const steps: StepPathCoordinate[] = gameCalculator.splitPathInSteps(pathResponseStateEvent.path);
      const requestStepPathStateEvents: RequestStepPathStateEvent[] = steps.map(
        (stepPath, index): RequestStepPathStateEvent => ({
          gameEventType: GameEventTypeEnum.STEP_PATH,
          movementType: pathResponseStateEvent.movementType,
          priority: basePriorityMovement + index,
          sourceRobotId: pathResponseStateEvent.sourceRobotId,
          stepPath,
        })
      );
      pendingGameEvents.addAll(requestStepPathStateEvents);
    }
  }
}
