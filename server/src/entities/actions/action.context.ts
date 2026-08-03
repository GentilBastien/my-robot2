import { GameState } from 'shared';
import { GameStateHandler } from '@game/game.state-handler';
import { ArrayIndexStructure } from '@structures/array-index/array-index.structure';
import { RequestEvent } from '@events/request.event';
import { ActionResponseEvent } from '@events/action/action.response-event';

export interface ActionContext {
  readonly actionResponseEvent: ActionResponseEvent;
  readonly gameState: Readonly<GameState>;
  readonly gameStateHandler: GameStateHandler;
  readonly pendingRequests: ArrayIndexStructure<RequestEvent>;
}
