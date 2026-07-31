import { RequestEvent } from '@events/request.event';
import { ContextEvent } from '@events/context.event';
import { PathResponseEvent } from '@events/path/path.response-event';
import { Coordinates, MovementTypeEnum, PathCostCoordinate } from 'shared';
import { RobotCalculator } from '@calculators/robot.calculator';
import { CellCalculator } from '@calculators/cell.calculator';

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
    const isRobotTurn = RobotCalculator.isRobotTurn(context, this.sourceRobotId);
    const pathWithCosts: PathCostCoordinate = CellCalculator.mapPathToPathWithCost(context, this.path);
    const pathCost: number = CellCalculator.getPathCoordinateCost(pathWithCosts);
    const robotRemainingMove = RobotCalculator.getRobotState(context, this.sourceRobotId).resources.remainingMove;
    const enoughRemainingMovement = robotRemainingMove >= pathCost;
    const movementTypeAllowed: boolean = RobotCalculator.movementTypeAllowedForRobot(
      context,
      this.sourceRobotId,
      this.movementType
    );
    const pathResultsInMovement: boolean = CellCalculator.pathResultsInMovement(context, this.sourceRobotId, this.path);
    return new PathResponseEvent({
      movementType: this.movementType,
      responseValidated: isRobotTurn && enoughRemainingMovement && movementTypeAllowed && pathResultsInMovement,
      sourceRobotId: this.sourceRobotId,
      path: pathWithCosts,
    });
  }
}
