import { ContextEvent } from '@events/context.event';
import { ResponseEvent } from '@events/response.event';
import { MaybeArray, Reducer, ResourcesState } from 'shared';
import { updateResourcesState } from '@reducers/resources.reducer';
import { getRobotResourcesState } from '@calculators/robot.calculator';

export class ResourcesResponseEvent implements ResponseEvent {
  sourceRobotId: string;
  responseValidated: boolean;

  public constructor(parameters: { sourceRobotId: string; responseValidated: boolean }) {
    this.sourceRobotId = parameters.sourceRobotId;
    this.responseValidated = parameters.responseValidated;
  }

  public mapToReducer(context: ContextEvent): MaybeArray<Reducer> {
    const resourcesState: ResourcesState = getRobotResourcesState(context.gameState, this.sourceRobotId);

    const { regenHp, regenMana, coolingDown, isOverheating, maxOverheating, totalActions, totalSubActions, totalMove } =
      resourcesState;

    const newHp = this.incrementsHpByValue(resourcesState, regenHp);
    const newMana = this.incrementsManaByValue(resourcesState, regenMana);
    const cooling = this.computeCooling(isOverheating, coolingDown);
    const newOverheating = this.decrementsOverheatingByValue(resourcesState, cooling);
    const newIsOverheating =
      (isOverheating && newOverheating === 0) || (!isOverheating && newOverheating === maxOverheating);

    const newResourcesState: ResourcesState = {
      ...resourcesState,
      hp: newHp,
      mana: newMana,
      overheating: newOverheating,
      isOverheating: newIsOverheating,
      remainingActions: totalActions,
      remainingSubActions: totalSubActions,
      remainingMove: totalMove,
    };
    return updateResourcesState(this.sourceRobotId, newResourcesState);
  }

  private incrementsHpByValue(resourcesState: ResourcesState, value: number): number {
    return this.incrementsValue(0, resourcesState.maxHp, resourcesState.hp, value);
  }

  private incrementsManaByValue(resourcesState: ResourcesState, value: number): number {
    return this.incrementsValue(0, resourcesState.maxMana, resourcesState.mana, value);
  }

  private decrementsOverheatingByValue(resourcesState: ResourcesState, value: number): number {
    return this.incrementsValue(0, resourcesState.maxOverheating, resourcesState.overheating, value);
  }

  private computeCooling(isOverheating: boolean, coolingDown: number): number {
    return isOverheating ? Math.ceil(coolingDown / 2) : coolingDown;
  }

  /**
   * Returns the calculation of current + incr, but always enclosed by range [min, max]
   */
  private incrementsValue(min: number, max: number, current: number, incr: number): number {
    return Math.max(min, Math.min(current + incr, max));
  }
}
