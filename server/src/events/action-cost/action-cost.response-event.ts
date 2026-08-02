import { ContextEvent } from '@events/context.event';
import { ResponseEvent } from '@events/response.event';
import { MaybeArray, Reducer, ResourcesState } from 'shared';
import { remainingActionsReducer, remainingSubActionsReducer } from '@reducers/resources.reducer';
import { RobotCalculator } from '@calculators/robot.calculator';

export class ActionCostResponseEvent implements ResponseEvent {
  sourceRobotId: string;
  responseValidated: boolean;
  actionCost: number;
  subActionCost: number;

  public constructor(parameters: {
    sourceRobotId: string;
    responseValidated: boolean;
    actionCost: number;
    subActionCost: number;
  }) {
    this.sourceRobotId = parameters.sourceRobotId;
    this.responseValidated = parameters.responseValidated;
    this.actionCost = parameters.actionCost;
    this.subActionCost = parameters.subActionCost;
  }

  public mapToReducer(context: ContextEvent): MaybeArray<Reducer> {
    const resourcesState: ResourcesState = RobotCalculator.getRobotResourcesState(context, this.sourceRobotId);
    const newRemainingActions = resourcesState.remainingActions - this.actionCost;
    const newRemainingSubActions = resourcesState.remainingSubActions - this.subActionCost;
    return [
      remainingActionsReducer(this.sourceRobotId, newRemainingActions),
      remainingSubActionsReducer(this.sourceRobotId, newRemainingSubActions),
    ];
  }
}
