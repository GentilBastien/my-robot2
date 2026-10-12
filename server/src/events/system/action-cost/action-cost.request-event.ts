import { RequestEvent } from '@events/request.event';
import { EventContext } from '@events/context.event';
import { ActionCostResponseEvent } from '@events/system/action-cost/action-cost.response-event';

export class ActionCostRequestEvent implements RequestEvent {
  sourceRobotId: string;
  actionCost: number;
  subActionCost: number;

  constructor(sourceRobotId: string, actionCost: number, subActionCost: number) {
    this.sourceRobotId = sourceRobotId;
    this.actionCost = actionCost;
    this.subActionCost = subActionCost;
  }

  public resolve(_context: EventContext): ActionCostResponseEvent {
    return new ActionCostResponseEvent({
      sourceRobotId: this.sourceRobotId,
      responseValidated: true,
      actionCost: this.actionCost,
      subActionCost: this.subActionCost,
    });
  }
}
