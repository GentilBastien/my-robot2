import { ResponseEvent } from '@events/response.event';
import { ContextEvent } from '@events/context.event';
import { MaybeArray, MovementTypeEnum, PathCostCoordinate, Reducer, StepPathCostCoordinate } from 'shared';
import { StepPathRequestEvent } from '@events/step-path/step-path.request-event';

export class PathResponseEvent implements ResponseEvent {
  sourceRobotId: string;
  responseValidated: boolean;
  movementType: MovementTypeEnum;
  path: PathCostCoordinate;

  public mapToReducer(context: ContextEvent): MaybeArray<Reducer> {
    switch (this.movementType) {
      case MovementTypeEnum.JUMPED:
      case MovementTypeEnum.TELEPORTED: {
        const pathCoordsAsOneStep: StepPathCostCoordinate | undefined = context.gameCalculator.pathCoordinateIsOneStep(
          this.path
        );
        if (pathCoordsAsOneStep) {
          const stepPath = new StepPathRequestEvent(this.sourceRobotId, this.movementType, pathCoordsAsOneStep);
          context.pendingRequests.insertEnd(stepPath);
        }
        break;
      }
      case MovementTypeEnum.HOVERED:
      case MovementTypeEnum.WALKED:
      default: {
        const steps: StepPathCostCoordinate[] = context.gameCalculator.splitPathInSteps(this.path);
        const requestStepPathStateEvents: StepPathRequestEvent[] = steps.map(
          stepPath => new StepPathRequestEvent(this.sourceRobotId, this.movementType, stepPath)
        );
        context.pendingRequests.insertEnd(requestStepPathStateEvents);
      }
    }
    return [];
  }

  public constructor(parameters: {
    sourceRobotId: string;
    responseValidated: boolean;
    movementType: MovementTypeEnum;
    path: PathCostCoordinate;
  }) {
    this.sourceRobotId = parameters.sourceRobotId;
    this.responseValidated = parameters.responseValidated;
    this.movementType = parameters.movementType;
    this.path = parameters.path;
  }
}
