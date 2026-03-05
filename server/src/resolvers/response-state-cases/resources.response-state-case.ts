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

  const newHp = incrementsHpByValue(resourcesState, resourcesState.regenHp);
  const newMana = incrementsManaByValue(resourcesState, resourcesState.regenMana);
  const cooling = resourcesState.isOverheating ? Math.ceil(resourcesState.coolingDown / 2) : resourcesState.coolingDown;
  const newOverheating = decrementsOverheatingByValue(resourcesState, cooling);
  const newIsOverheating =
    (resourcesState.isOverheating && newOverheating === 0) ||
    (!resourcesState.isOverheating && newOverheating === resourcesState.maxOverheating);
  const newRemainingMove = resourcesState.totalMove;

  const newResourcesState: ResourcesState = {
    ...resourcesState,
    hp: newHp,
    mana: newMana,
    overheating: newOverheating,
    isOverheating: newIsOverheating,
    remainingMove: newRemainingMove,
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
