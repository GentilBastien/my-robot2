import { RequestEvent } from '@events/request.event';
import { ContextEvent } from '@events/context.event';
import { PathResponseEvent } from '@events/path/path.response-event';
import { Coordinate, MovementTypeEnum, PathCostCoordinate } from 'shared';
import { RobotCalculator } from '@calculators/robot.calculator';
import { CellCalculator } from '@calculators/cell.calculator';

export class PathRequestEvent implements RequestEvent {
  sourceRobotId: string;
  movementType: MovementTypeEnum;
  path: Coordinate[];

  constructor(sourceRobotId: string, movementType: MovementTypeEnum, path: Coordinate[]) {
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
    const pathIsValid: boolean = CellCalculator.checkPathIsValid(
      context,
      this.sourceRobotId,
      this.path,
      this.movementType
    );
    return new PathResponseEvent({
      movementType: this.movementType,
      responseValidated: isRobotTurn && enoughRemainingMovement && movementTypeAllowed && pathIsValid,
      sourceRobotId: this.sourceRobotId,
      path: pathWithCosts,
    });
  }
}
