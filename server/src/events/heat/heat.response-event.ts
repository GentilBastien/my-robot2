import { ContextEvent } from '@events/context.event';
import { ResponseEvent } from '@events/response.event';
import { Reducer } from 'shared';
import { valueInRange } from '@utils/function.utils';
import { heatReducer } from '@reducers/resources.reducer';

export class HeatResponseEvent implements ResponseEvent {
  sourceRobotId: string;
  responseValidated: boolean;
  value: number;

  public mapToReducer(context: ContextEvent): Reducer | null {
    const resourcesState = context.gameCalculator.getRobotResourcesState(context.gameState, this.sourceRobotId);

    const delta = this.computeCooling(resourcesState.isOverheating, this.value);
    const newOverheatingValue = valueInRange(0, resourcesState.maxOverheating, resourcesState.overheating + delta);

    return heatReducer(this.sourceRobotId, newOverheatingValue);
  }

  public constructor(parameters: { sourceRobotId: string; responseValidated: boolean; value: number }) {
    this.sourceRobotId = parameters.sourceRobotId;
    this.responseValidated = parameters.responseValidated;
    this.value = parameters.value;
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
