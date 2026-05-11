import { ContextEvent } from '@events/context.event';
import { ResponseEvent } from '@events/response.event';
import { Reducer } from 'shared';
import { valueInRange } from '@utils/function.utils';
import { manaReducer } from '@reducers/resources.reducer';

export class ManaResponseEvent implements ResponseEvent {
  sourceRobotId: string;
  responseValidated: boolean;
  value: number;

  public mapToReducer(context: ContextEvent): Reducer | null {
    const resourcesState = context.gameCalculator.getRobotResourcesState(context.gameState, this.sourceRobotId);
    const newManaValue = valueInRange(0, resourcesState.maxMana, resourcesState.mana + this.value);
    return manaReducer(this.sourceRobotId, newManaValue);
  }

  public constructor(parameters: { sourceRobotId: string; responseValidated: boolean; value: number }) {
    this.sourceRobotId = parameters.sourceRobotId;
    this.responseValidated = parameters.responseValidated;
    this.value = parameters.value;
  }
}
