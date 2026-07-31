import { ContextEvent } from '@events/context.event';
import { ResponseEvent } from '@events/response.event';
import { MaybeArray, Reducer } from 'shared';
import { valueInRange } from '@utils/function.utils';
import { heatReducer } from '@reducers/resources.reducer';
import { RobotCalculator } from '@calculators/robot.calculator';

export class HeatResponseEvent implements ResponseEvent {
  sourceRobotId: string;
  responseValidated: boolean;
  value: number;

  public constructor(parameters: { sourceRobotId: string; responseValidated: boolean; value: number }) {
    this.sourceRobotId = parameters.sourceRobotId;
    this.responseValidated = parameters.responseValidated;
    this.value = parameters.value;
  }

  public mapToReducer(context: ContextEvent): MaybeArray<Reducer> {
    const resourcesState = RobotCalculator.getRobotResourcesState(context, this.sourceRobotId);

    const delta = this.computeCooling(resourcesState.isOverheating, this.value);
    const newOverheatingValue = valueInRange(0, resourcesState.maxOverheating, resourcesState.overheating + delta);

    return heatReducer(this.sourceRobotId, newOverheatingValue);
  }

  private computeCooling(isOverheating: boolean, value: number): number {
    if (isOverheating) {
      if (value > 0) {
        return value * 2;
      }
      return Math.ceil(value / 2);
    }
    return value;
  }
}
