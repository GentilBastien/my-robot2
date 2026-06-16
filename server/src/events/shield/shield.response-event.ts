import { ContextEvent } from '@events/context.event';
import { ResponseEvent } from '@events/response.event';
import { MaybeArray, Reducer } from 'shared';
import { valueInRange } from '@utils/function.utils';
import { shieldReducer } from '@reducers/resources.reducer';

export class ShieldResponseEvent implements ResponseEvent {
  sourceRobotId: string;
  responseValidated: boolean;
  value: number;

  public constructor(parameters: { sourceRobotId: string; responseValidated: boolean; value: number }) {
    this.sourceRobotId = parameters.sourceRobotId;
    this.responseValidated = parameters.responseValidated;
    this.value = parameters.value;
  }

  public mapToReducer(context: ContextEvent): MaybeArray<Reducer> {
    const resourcesState = context.gameCalculator.getRobotResourcesState(context.gameState, this.sourceRobotId);
    const newHpValue = valueInRange(0, Number.MAX_VALUE, resourcesState.shield + this.value);
    return shieldReducer(this.sourceRobotId, newHpValue);
  }
}
