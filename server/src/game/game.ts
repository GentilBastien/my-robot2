import { PriorityListStructure } from '@structures/priority-list/priority-list.structure';
import { RequestStateEvent } from '@events/request-state.event';
import { Comparator, GameEvent, GameState, Reducer } from 'shared';
import { requestStateEventResolver } from '@resolvers/request-state-event.resolver';
import { responseStateEventResolver } from '@resolvers/response-state-event.resolver';
import { gameEventResolver } from '@resolvers/game-event.resolver';
import { ResponseStateEvent } from '@events/response-state.event';
import { GameConfig } from './game.config';
import { GameCalculator } from './game-calculator/game.calculator';

/**
 * Receives GameEvents and ActionEvents, dispatch events to system and then resolvers to reduce them.
 */
export class Game {
  private gameState: GameState;
  private readonly gameCalculator: GameCalculator;
  private readonly pendingRequestEvents: PriorityListStructure<RequestStateEvent>;

  constructor(gameConfig: GameConfig) {
    this.gameState = gameConfig.gameState;
    this.gameCalculator = new GameCalculator(gameConfig);
    const comparator: Comparator<RequestStateEvent> = (item1: RequestStateEvent, item2: RequestStateEvent): number =>
      (item1.priority ?? 0) - (item2.priority ?? 0);
    this.pendingRequestEvents = new PriorityListStructure(comparator);
  }

  public receiveGameEventFromClient(gameRequestEvent: GameEvent): void {
    this.resolveGameEvent(gameRequestEvent);
  }

  private resolveGameEvent(gameRequestEvent: GameEvent): void {
    const requestEvent: RequestStateEvent = gameEventResolver(gameRequestEvent);
    this.pendingRequestEvents.add(requestEvent);
    const responses: ResponseStateEvent[] = this.resolveAllPendingRequestEvents(this.gameState);
    this.gameState = this.consumeAllResponseEvents(this.gameState, responses);
  }

  private resolveAllPendingRequestEvents(readonlyGameState: Readonly<GameState>) {
    const responseEvents: ResponseStateEvent[] = [];
    let currentRequestEvent: RequestStateEvent | undefined;
    do {
      currentRequestEvent = this.pendingRequestEvents.poll();
      if (currentRequestEvent === undefined) {
        break;
      }
      const responseEventsFromRequest: ResponseStateEvent[] = requestStateEventResolver(
        this.gameCalculator,
        readonlyGameState,
        currentRequestEvent
      );
      responseEvents.push(...responseEventsFromRequest);
    } while (this.pendingRequestEvents.elements.length > 0);
    return responseEvents;
  }

  private consumeAllResponseEvents(
    readonlyGameState: Readonly<GameState>,
    responseEvents: ResponseStateEvent[]
  ): GameState {
    //Impl Note : responseEvents are mapped to reduces keeping its ordering.
    const reducers: (Reducer | null)[] = responseEvents.map(responseEvent =>
      responseStateEventResolver(this.gameCalculator, readonlyGameState, responseEvent, this.pendingRequestEvents)
    );
    //once reducers are filled and pendingEvents consumed, apply all of them in order
    return reducers.reduce((state, reducer) => (reducer ? reducer(state) : state), readonlyGameState);
  }
}
