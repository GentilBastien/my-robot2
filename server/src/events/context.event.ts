import { GameState } from 'shared';
import { RequestEvent } from '@events/request.event';
import { ArrayIndexStructure } from '@structures/array-index/array-index.structure';
import { GameStateHandler } from '@game/game.state-handler';

export interface EventContext {
  readonly gameState: Readonly<GameState>;
  readonly gameStateHandler: GameStateHandler;
  readonly pendingRequests: ArrayIndexStructure<RequestEvent>;
}
