import { ContextEvent } from '@events/context.event';
import { ResponseEvent } from '@events/response.event';
import { MaybeArray, Reducer } from 'shared';
import { remainingActionsReducer, remainingSubActionsReducer } from '@reducers/resources.reducer';

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

  public mapToReducer(_context: ContextEvent): MaybeArray<Reducer> {
    return [
      remainingActionsReducer(this.sourceRobotId, this.actionCost),
      remainingSubActionsReducer(this.sourceRobotId, this.subActionCost),
    ];
  }
}
