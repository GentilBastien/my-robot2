import { RequestEvent } from '@events/request.event';
import { EventContext } from '@events/context.event';
import { MovementCostResponseEvent } from '@events/movement-cost/movement-cost.response-event';
import { RobotCalculator } from '@calculators/robot.calculator';

export class MovementCostRequestEvent implements RequestEvent {
  sourceRobotId: string;
  movementCost: number;

  constructor(sourceRobotId: string, movementCost: number) {
    this.sourceRobotId = sourceRobotId;
    this.movementCost = movementCost;
  }

  public mapToResponse(context: EventContext): MovementCostResponseEvent {
    const hasEnoughMovement: boolean =
      RobotCalculator.getRobotResourcesState(context, this.sourceRobotId).remainingMove >= this.movementCost;
    return new MovementCostResponseEvent({
      sourceRobotId: this.sourceRobotId,
      responseValidated: hasEnoughMovement,
      movementCost: this.movementCost,
    });
  }
}
