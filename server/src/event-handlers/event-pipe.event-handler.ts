import { GameState } from '@states/game-state';
import { GameEvent } from '@events/game.events';
import { RequestStateEvent } from '@events/request-state.event';
import { ResponseStateEvent } from '@events/response-state.event';
import { PriorityListStructure } from '@structures/priority-list/priority-list.structure';
import { GameEventResolver } from '@resolvers/game.event-resolver';
import { RequestStateEventResolver } from '@resolvers/request-state.event-resolver';
import { ResponseStateEventResolver } from '@resolvers/response-state.event-resolver';

/**
 * Events are being reduced here.
 */
export class EventPipeEventHandler {
  public handleGameEvent(
    readonlyGameState: Readonly<GameState>,
    gameEvent: GameEvent,
    pendingGameEvents: PriorityListStructure<GameEvent>
  ): GameState {
    let requestStateEvents: RequestStateEvent | null;
    let responseStateEvents: ResponseStateEvent | null = null;
    let newGameState: GameState = readonlyGameState;

    //map GameEvent to RequestStateEvent
    requestStateEvents = GameEventResolver.resolve(readonlyGameState, gameEvent, pendingGameEvents);

    if (requestStateEvents) {
      responseStateEvents = RequestStateEventResolver.resolve(readonlyGameState, requestStateEvents, pendingGameEvents);
    }

    if (responseStateEvents) {
      newGameState = ResponseStateEventResolver.resolve(readonlyGameState, responseStateEvents, pendingGameEvents);
    }

    return newGameState;
  }
}
