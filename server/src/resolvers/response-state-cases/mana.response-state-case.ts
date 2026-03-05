import { ManaResponseStateEvent } from '@events/response-state.event';
import { FunctionUtils, GameState, Reducer } from 'shared';
import { GameCalculator } from '../../game/game-calculator/game.calculator';
import { manaReducer } from '@reducers/resources.reducer';

export function manaResponseStateCase(
  gameCalculator: GameCalculator,
  readonlyGameState: Readonly<GameState>,
  manaResponseStateEvent: ManaResponseStateEvent
): Reducer {
  const resourcesState = gameCalculator.getRobotResourcesState(readonlyGameState, manaResponseStateEvent.sourceRobotId);
  const newVal = resourcesState.mana + manaResponseStateEvent.value;
  const newManaValue = FunctionUtils.valueIn(0, resourcesState.maxMana, newVal);
  return manaReducer(manaResponseStateEvent.sourceRobotId, newManaValue);
}
