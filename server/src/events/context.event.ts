import { GameState } from 'shared';
import { GameCalculator } from '@game/game-calculator/game.calculator';
import { RequestEvent } from '@events/request.event';

export interface ContextEvent {
  readonly gameState: Readonly<GameState>;
  readonly gameCalculator: GameCalculator;
  readonly pendingRequests: RequestEvent[];
}
