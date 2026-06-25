import { GameState } from 'shared';
import { RequestEvent } from '@events/request.event';
import { ArrayIndexStructure } from '@structures/array-index/array-index.structure';
import { GameCalculator } from '@calculators/game.calculator';

export interface ContextEvent {
  readonly gameState: Readonly<GameState>;
  readonly gameCalculator: GameCalculator;
  readonly pendingRequests: ArrayIndexStructure<RequestEvent>;
}
