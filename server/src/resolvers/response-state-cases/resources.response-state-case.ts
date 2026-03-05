import { ResourcesResponseStateEvent } from '@events/response-state.event';
import { GameState, Reducer, ResourcesState } from 'shared';
import { GameCalculator } from '../../game/game-calculator/game.calculator';
import { updateResourcesState } from '@reducers/resources.reducer';

export function resourcesResponseStateCase(
  gameCalculator: GameCalculator,
  readonlyGameState: Readonly<GameState>,
  resourcesResponseStateEvent: ResourcesResponseStateEvent
): Reducer {
  const resourcesState: ResourcesState = gameCalculator.getRobotResourcesState(
    readonlyGameState,
    resourcesResponseStateEvent.sourceRobotId
  );

  const { regenHp, regenMana, coolingDown, isOverheating, maxOverheating, totalMove } = resourcesState;

  const newHp = incrementsHpByValue(resourcesState, regenHp);
  const newMana = incrementsManaByValue(resourcesState, regenMana);
  const cooling = computeCooling(isOverheating, coolingDown);
  const newOverheating = decrementsOverheatingByValue(resourcesState, cooling);
  const newIsOverheating =
    (isOverheating && newOverheating === 0) || (!isOverheating && newOverheating === maxOverheating);

  const newResourcesState: ResourcesState = {
    ...resourcesState,
    hp: newHp,
    mana: newMana,
    overheating: newOverheating,
    isOverheating: newIsOverheating,
    remainingMove: totalMove,
  };
  return updateResourcesState(resourcesResponseStateEvent.sourceRobotId, newResourcesState);
}

function incrementsHpByValue(resourcesState: ResourcesState, value: number): number {
  return incrementsValue(0, resourcesState.maxHp, resourcesState.hp, value);
}

function incrementsManaByValue(resourcesState: ResourcesState, value: number): number {
  return incrementsValue(0, resourcesState.maxMana, resourcesState.mana, value);
}

function decrementsOverheatingByValue(resourcesState: ResourcesState, value: number): number {
  return incrementsValue(0, resourcesState.maxOverheating, resourcesState.overheating, value);
}

function computeCooling(isOverheating: boolean, coolingDown: number) {
  return isOverheating ? Math.ceil(coolingDown / 2) : coolingDown;
}

/**
 * Returns the calculation of current + incr, but always enclosed by range [min, max]
 * @param min The min value of the allowed range.
 * @param max The max value of the allowed range.
 * @param current The current value.
 * @param incr The increment, added to the current value.
 */
function incrementsValue(min: number, max: number, current: number, incr: number): number {
  return Math.max(min, Math.min(current + incr, max));
}
