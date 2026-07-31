import { ContextEvent } from '@events/context.event';
import { ResponseEvent } from '@events/response.event';
import { MaybeArray, Reducer } from 'shared';
import { valueInRange } from '@utils/function.utils';
import { manaReducer } from '@reducers/resources.reducer';
import { RobotCalculator } from '@calculators/robot.calculator';

export class ManaResponseEvent implements ResponseEvent {
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
    const newManaValue = valueInRange(0, resourcesState.maxMana, resourcesState.mana + this.value);
    return manaReducer(this.sourceRobotId, newManaValue);
  }
}
