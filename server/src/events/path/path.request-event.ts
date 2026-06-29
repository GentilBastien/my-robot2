import { RequestEvent } from '@events/request.event';
import { ContextEvent } from '@events/context.event';
import { PathResponseEvent } from '@events/path/path.response-event';
import { Coordinates, MovementTypeEnum, PathCostCoordinate } from 'shared';
import { robotCalculator } from '@calculators/robot.calculator';

export class PathRequestEvent implements RequestEvent {
  sourceRobotId: string;
  movementType: MovementTypeEnum;
  path: Coordinates[];

  constructor(sourceRobotId: string, movementType: MovementTypeEnum, path: Coordinates[]) {
    this.sourceRobotId = sourceRobotId;
    this.movementType = movementType;
    this.path = path;
  }

  public mapToResponse(context: ContextEvent): PathResponseEvent {
    const isRobotTurn = context.gameCalculator.isRobotTurn(this.sourceRobotId);
    const pathWithCosts: PathCostCoordinate = context.gameCalculator.mapPathToPathWithCost(this.path);
    const pathCost: number = context.gameCalculator.getPathCoordinateCost(pathWithCosts);
    const robotRemainingMove = robotCalculator.getRobotState(context.gameState, this.sourceRobotId).resources
      .remainingMove;
    const enoughRemainingMovement = robotRemainingMove >= pathCost;
    const movementTypeAllowed: boolean = context.gameCalculator.movementTypeAllowedForRobot(
      context.gameState,
      this.sourceRobotId,
      this.movementType
    );
    const pathResultsInMovement: boolean = context.gameCalculator.pathResultsInMovement(
      context.gameState,
      this.sourceRobotId,
      this.path
    );
    return new PathResponseEvent({
      movementType: this.movementType,
      responseValidated: isRobotTurn && enoughRemainingMovement && movementTypeAllowed && pathResultsInMovement,
      sourceRobotId: this.sourceRobotId,
      path: pathWithCosts,
    });
  }
}
