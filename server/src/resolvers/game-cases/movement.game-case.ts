import { RequestMoveStateEvent } from '@events/request-state.event';
import { GameEventTypeEnum, MovementTypeEnum, PathCoordinate, StepPathCoordinate } from 'shared';
import { MovementGameEvent } from '@events/game.event';

export function movementGameCase(movementGameEvent: MovementGameEvent): RequestMoveStateEvent[] {
  const basePriorityMovement = 10;
  switch (movementGameEvent.movementType) {
    case MovementTypeEnum.JUMPED:
      return [];
    case MovementTypeEnum.TELEPORTED:
      return [];
    case MovementTypeEnum.HOVERED:
    case MovementTypeEnum.WALKED:
    default: {
      const requestStepMoveStateEvents: RequestMoveStateEvent[] = [];
      const path: PathCoordinate = movementGameEvent.path;
      for (let i = 0; i < path.coordinatesPath.length - 1; i++) {
        const startCoordinates = path.coordinatesPath[i];
        const endCoordinates = path.coordinatesPath[i + 1];
        const stepCost = path.costs[i + 1];
        const stepPathCoordinate: StepPathCoordinate = {
          startCoordinates,
          endCoordinates,
          cost: stepCost,
        };
        const requestStepMoveStateEvent: RequestMoveStateEvent = {
          gameEventType: GameEventTypeEnum.MOVEMENT,
          movementType: movementGameEvent.movementType,
          priority: basePriorityMovement + i,
          sourceRobotId: movementGameEvent.sourceRobotId,
          stepPath: stepPathCoordinate,
        };
        requestStepMoveStateEvents.push(requestStepMoveStateEvent);
      }
      return requestStepMoveStateEvents;
    }
  }
}
