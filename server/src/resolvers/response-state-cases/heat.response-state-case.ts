import { HeatResponseStateEvent } from '@events/response-state.event';
import { FunctionUtils_valueIn, GameState, Reducer } from 'shared';
import { GameCalculator } from '../../game/game-calculator/game.calculator';
import { heatReducer } from '@reducers/resources.reducer';

export function heatResponseStateCase(
  gameCalculator: GameCalculator,
  readonlyGameState: Readonly<GameState>,
  heatResponseStateEvent: HeatResponseStateEvent
): Reducer {
  const resourcesState = gameCalculator.getRobotResourcesState(readonlyGameState, heatResponseStateEvent.sourceRobotId);

  const { value } = heatResponseStateEvent;
  const delta = computeCooling(resourcesState.isOverheating, value);

  const newOverheatingValue = FunctionUtils_valueIn(
    0,
    resourcesState.maxOverheating,
    resourcesState.overheating + delta
  );

  return heatReducer(heatResponseStateEvent.sourceRobotId, newOverheatingValue);
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
