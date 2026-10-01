import { ActionData, GameState } from 'shared';
import { GameStateHandler } from '@game/game.state-handler';
import { ArrayIndexStructure } from '@structures/array-index/array-index.structure';
import { RequestEvent } from '@events/request.event';

export interface ActionContext {
  readonly actionData: ActionData;
  readonly gameState: Readonly<GameState>;
  readonly gameStateHandler: GameStateHandler;
  readonly pendingRequests: ArrayIndexStructure<RequestEvent>;
}
