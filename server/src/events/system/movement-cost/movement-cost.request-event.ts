import { RequestEvent } from '@events/request.event';
import { EventContext } from '@events/context.event';
import { MovementCostResponseEvent } from '@events/system/movement-cost/movement-cost.response-event';

export class MovementCostRequestEvent implements RequestEvent {
  sourceRobotId: string;
  movementCost: number;

  constructor(sourceRobotId: string, movementCost: number) {
    this.sourceRobotId = sourceRobotId;
    this.movementCost = movementCost;
  }

  public resolve(_context: EventContext): MovementCostResponseEvent {
    return new MovementCostResponseEvent({
      sourceRobotId: this.sourceRobotId,
      responseValidated: true,
      movementCost: this.movementCost,
    });
  }
}
