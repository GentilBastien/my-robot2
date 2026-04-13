import { DamageResponseStateEvent } from '@events/response-state.event';
import { GameState, Reducer } from 'shared';
import { GameCalculator } from '@game/game-calculator/game.calculator';
import { hpAndShieldReducer, hpReducer, shieldReducer } from '@reducers/resources.reducer';

export function damageResponseStateCase(
  gameCalculator: GameCalculator,
  readonlyGameState: Readonly<GameState>,
  damageResponseStateEvent: DamageResponseStateEvent
): Reducer {
  const { targetRobotId, damageDealt } = damageResponseStateEvent;
  const { hp, shield } = gameCalculator.getRobotResourcesState(readonlyGameState, targetRobotId);

  if (damageDealt <= shield) {
    //shield reducer only
    const newShield = shield - damageDealt;
    return shieldReducer(targetRobotId, newShield);
  } else if (shield === 0) {
    //hp reducer only
    const newHp = hp - damageDealt;
    return hpReducer(targetRobotId, newHp);
  } else {
    //both hp and shield reducers
    const newHp = hp + shield - damageDealt;
    return hpAndShieldReducer(targetRobotId, newHp);
  }
}
