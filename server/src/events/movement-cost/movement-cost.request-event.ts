import { RequestEvent } from '@events/request.event';
import { ContextEvent } from '@events/context.event';
import { MovementCostResponseEvent } from '@events/movement-cost/movement-cost.response-event';

export class MovementCostRequestEvent implements RequestEvent {
  sourceRobotId: string;
  movementCost: number;

  constructor(sourceRobotId: string, movementCost: number) {
    this.sourceRobotId = sourceRobotId;
    this.movementCost = movementCost;
  }

  public mapToResponse(_context: ContextEvent): MovementCostResponseEvent {
    return new MovementCostResponseEvent({
      sourceRobotId: this.sourceRobotId,
      responseValidated: true,
      movementCost: this.movementCost,
    });
  }
}
