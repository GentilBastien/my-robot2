import { HeatResponseStateEvent } from '@events/response-state.event';
import { GameState, Reducer } from 'shared';
import { GameCalculator } from '../../game/game-calculator/game.calculator';
import { heatReducer } from '@reducers/resources.reducer';
import { FunctionUtils_valueIn } from '@utils/function.utils';

export function heatResponseStateCase(
  gameCalculator: GameCalculator,
  readonlyGameState: Readonly<GameState>,
  heatResponseStateEvent: HeatResponseStateEvent
): Reducer {
  const { sourceRobotId, value } = heatResponseStateEvent;
  const resourcesState = gameCalculator.getRobotResourcesState(readonlyGameState, sourceRobotId);

  const delta = computeCooling(resourcesState.isOverheating, value);

  const newOverheatingValue = FunctionUtils_valueIn(
    0,
    resourcesState.maxOverheating,
    resourcesState.overheating + delta
  );

  return heatReducer(sourceRobotId, newOverheatingValue);
}

function computeCooling(isOverheating: boolean, value: number): number {
  if (isOverheating) {
    if (value > 0) {
      return value * 2;
    }
    return Math.ceil(value / 2);
  }
  return value;
}
