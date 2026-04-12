import { RequestActionStateEvent } from '@events/request-action-state.event';
import { GameCalculator } from '@game/game-calculator/game.calculator';
import { GameState } from 'shared';

export interface ActionContext {
  requestActionStateEvent: RequestActionStateEvent;
  readonlyGameState: Readonly<GameState>;
  gameCalculator: GameCalculator;
}
