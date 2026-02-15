import { AdvanceTurnResponseStateEvent } from '@events/response-state.event';
import { Reducer } from 'shared';
import { GameCalculator } from '../../game/game-calculator/game.calculator';
import { turnAdvanceReducer } from '../../reducers/turn.reducer';

export function advanceTurnResponseStateCase(
  gameCalculator: GameCalculator,
  responseAdvanceTurnEvent: AdvanceTurnResponseStateEvent
): Reducer {
  gameCalculator.advanceTurn();
  return turnAdvanceReducer(responseAdvanceTurnEvent.turnNumber, responseAdvanceTurnEvent.turnRobotId);
}
