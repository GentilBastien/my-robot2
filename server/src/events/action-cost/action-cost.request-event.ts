import { RequestEvent } from '@events/request.event';
import { ContextEvent } from '@events/context.event';
import { ActionCostResponseEvent } from '@events/action-cost/action-cost.response-event';
import { ResourcesState } from 'shared';
import { RobotCalculator } from '@calculators/robot.calculator';

export class ActionCostRequestEvent implements RequestEvent {
  sourceRobotId: string;
  actionCost: number;
  subActionCost: number;

  constructor(sourceRobotId: string, actionCost: number, subActionCost: number) {
    this.sourceRobotId = sourceRobotId;
    this.actionCost = actionCost;
    this.subActionCost = subActionCost;
  }

  public mapToResponse(context: ContextEvent): ActionCostResponseEvent {
    const resourcesState: ResourcesState = RobotCalculator.getRobotResourcesState(context, this.sourceRobotId);
    const enoughRemainingAction: boolean =
      resourcesState.remainingActions > this.actionCost && resourcesState.remainingSubActions > this.subActionCost;
    return new ActionCostResponseEvent({
      sourceRobotId: this.sourceRobotId,
      responseValidated: enoughRemainingAction,
      actionCost: this.actionCost,
      subActionCost: this.subActionCost,
    });
  }
}
