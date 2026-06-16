import { RequestEvent } from '@events/request.event';
import { ContextEvent } from '@events/context.event';
import { ActionCostResponseEvent } from '@events/action-cost/action-cost.response-event';

export class ActionCostRequestEvent implements RequestEvent {
  sourceRobotId: string;
  actionCost: number;
  subActionCost: number;

  constructor(sourceRobotId: string, actionCost: number, subActionCost: number) {
    this.sourceRobotId = sourceRobotId;
    this.actionCost = actionCost;
    this.subActionCost = subActionCost;
  }

  public mapToResponse(_context: ContextEvent): ActionCostResponseEvent {
    return new ActionCostResponseEvent({
      sourceRobotId: this.sourceRobotId,
      responseValidated: true,
      actionCost: this.actionCost,
      subActionCost: this.subActionCost,
    });
  }
}
