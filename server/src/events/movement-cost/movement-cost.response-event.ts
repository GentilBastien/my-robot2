import { ContextEvent } from '@events/context.event';
import { ResponseEvent } from '@events/response.event';
import { MaybeArray, Reducer } from 'shared';
import { remainingMovementReducer } from '@reducers/resources.reducer';

export class MovementCostResponseEvent implements ResponseEvent {
  sourceRobotId: string;
  responseValidated: boolean;
  movementCost: number;

  public constructor(parameters: { sourceRobotId: string; responseValidated: boolean; movementCost: number }) {
    this.sourceRobotId = parameters.sourceRobotId;
    this.responseValidated = parameters.responseValidated;
    this.movementCost = parameters.movementCost;
  }

  public mapToReducer(_context: ContextEvent): MaybeArray<Reducer> {
    return remainingMovementReducer(this.sourceRobotId, this.movementCost);
  }
}
