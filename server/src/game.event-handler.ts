import { GameState } from '@states/game-state';
import { PriorityListStructure } from '@structures/priority-list/priority-list.structure';
import { RequestEvent } from '@events/request.event';
import { GameEventTypeEnum } from 'shared';
import { RequestEventResolver } from '@resolvers/request-event.resolver';
import { ResponseEventResolver } from '@resolvers/response-event.resolver';
import { GameEventResolver } from '@resolvers/game-event.resolver';
import { ResponseEvent } from '@events/response.event';

/**
 * Receives GameEvents and ActionEvents, dispatch events to system and then resolvers to reduce them.
 */
export class GameEventHandler {
  private gameState: GameState;
  private readonly pendingGameEvents: PriorityListStructure<RequestEvent>;

  constructor(initialState: GameState) {
    this.gameState = initialState;
    this.pendingGameEvents = new PriorityListStructure({
      compare(item1: RequestEvent, item2: RequestEvent): number {
        return (item1.priority ?? 0) - (item2.priority ?? 0);
      },
    });
  }

  public receiveGameEventFromClient(gameEventTypeEnum: GameEventTypeEnum): void {
    this.dispatchGameEvent(gameEventTypeEnum);
  }

  private dispatchGameEvent(gameEventTypeEnum: GameEventTypeEnum): void {
    const requestEvent = GameEventResolver.resolve(this.gameState, gameEventTypeEnum, this.pendingGameEvents);
    this.pendingGameEvents.add(requestEvent);

    this.gameState = this.resolveAllPendingGameEvents(this.gameState);
  }

  private resolveAllPendingGameEvents(readonlyGameState: Readonly<GameState>): GameState {
    let updatedGameState: GameState = readonlyGameState;
    let currentRequestEvent: RequestEvent | undefined;
    do {
      currentRequestEvent = this.pendingGameEvents.poll();
      if (currentRequestEvent === undefined) {
        break;
      }
      const responseEvent: ResponseEvent = RequestEventResolver.resolve(
        updatedGameState,
        currentRequestEvent,
        this.pendingGameEvents
      );
      updatedGameState = ResponseEventResolver.resolve(updatedGameState, responseEvent, this.pendingGameEvents);
    } while (this.pendingGameEvents.elements.length > 0);
    return updatedGameState;
  }
}
