import { HpResponseStateEvent } from '@events/response-state.event';
import { GameState, Reducer } from 'shared';
import { GameCalculator } from '@game/game-calculator/game.calculator';
import { manaReducer } from '@reducers/resources.reducer';
import { valuesInRange } from '@utils/function.utils';

export function hpResponseStateCase(
  gameCalculator: GameCalculator,
  readonlyGameState: Readonly<GameState>,
  hpResponseStateEvent: HpResponseStateEvent
): Reducer {
  const resourcesState = gameCalculator.getRobotResourcesState(readonlyGameState, hpResponseStateEvent.sourceRobotId);
  const newVal = resourcesState.hp + hpResponseStateEvent.value;
  const newHpValue = valuesInRange(0, resourcesState.maxHp, newVal);
  return manaReducer(hpResponseStateEvent.sourceRobotId, newHpValue);
}
