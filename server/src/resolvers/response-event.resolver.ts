import { GameState } from '@states/game.state';
import { ResponseEvent } from '@events/response.event';
import { PriorityListStructure } from '@structures/priority-list/priority-list.structure';
import { RequestEvent } from '@events/request.event';

export class ResponseEventResolver {
  public static resolve(
    readonlyGameState: GameState,
    responseEvent: ResponseEvent,
    pendingGameEvents: PriorityListStructure<RequestEvent>
  ): GameState {
    //return a NEW GameState
    //must not mutate the readonlyGameState
    return readonlyGameState;
  }
}
