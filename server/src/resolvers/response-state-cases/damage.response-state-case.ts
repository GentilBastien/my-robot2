import { DamageResponseStateEvent } from '@events/response-state.event';
import { GameState, Reducer } from 'shared';
import { GameCalculator } from '../../game/game-calculator/game.calculator';
import { hpReducer } from '@reducers/resources.reducer';

export function damageResponseStateCase(
  gameCalculator: GameCalculator,
  readonlyGameState: Readonly<GameState>,
  damageResponseStateEvent: DamageResponseStateEvent
): Reducer {
  const { targetRobotId, damageDealt } = damageResponseStateEvent;
  const newHp = gameCalculator.getRobotResourcesState(readonlyGameState, targetRobotId).hp - damageDealt;
  return hpReducer(targetRobotId, newHp);
}
