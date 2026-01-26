import { GameState } from '@states/game-state';
import { ResponseStateEvent } from '@events/response-state.event';
import { GameEvent } from '@events/game.events';
import { PriorityListStructure } from '@structures/priority-list/priority-list.structure';

export class ResponseStateEventResolver {
  public static resolve(
    readonlyGameState: GameState,
    responseStateEvent: ResponseStateEvent,
    pendingGameEvents: PriorityListStructure<GameEvent>
  ): GameState {
    //return a NEW GameState
    //must not mutate the readonlyGameState
    return readonlyGameState;
  }
}
