import { HpResponseStateEvent } from '@events/response-state.event';
import { FunctionUtils_valueIn, GameState, Reducer } from 'shared';
import { GameCalculator } from '../../game/game-calculator/game.calculator';
import { manaReducer } from '@reducers/resources.reducer';

export function hpResponseStateCase(
  gameCalculator: GameCalculator,
  readonlyGameState: Readonly<GameState>,
  hpResponseStateEvent: HpResponseStateEvent
): Reducer {
  const resourcesState = gameCalculator.getRobotResourcesState(readonlyGameState, hpResponseStateEvent.sourceRobotId);
  const newVal = resourcesState.hp + hpResponseStateEvent.value;
  const newHpValue = FunctionUtils_valueIn(0, resourcesState.maxHp, newVal);
  return manaReducer(hpResponseStateEvent.sourceRobotId, newHpValue);
}
