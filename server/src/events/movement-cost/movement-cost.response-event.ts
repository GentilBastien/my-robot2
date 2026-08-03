import { ContextEvent } from '@events/context.event';
import { ResponseEvent } from '@events/response.event';
import { MaybeArray, Reducer } from 'shared';
import { remainingMovementReducer } from '@reducers/resources.reducer';
import { RobotCalculator } from '@calculators/robot.calculator';

export class MovementCostResponseEvent implements ResponseEvent {
  sourceRobotId: string;
  responseValidated: boolean;
  movementCost: number;

  public constructor(parameters: { sourceRobotId: string; responseValidated: boolean; movementCost: number }) {
    this.sourceRobotId = parameters.sourceRobotId;
    this.responseValidated = parameters.responseValidated;
    this.movementCost = parameters.movementCost;
  }

  public mapToReducer(context: ContextEvent): MaybeArray<Reducer> {
    const newRemainingMove: number =
      RobotCalculator.getRobotResourcesState(context, this.sourceRobotId).remainingMove - this.movementCost;
    return remainingMovementReducer(this.sourceRobotId, newRemainingMove);
  }
}
