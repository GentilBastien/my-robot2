import { PriorityListStructure } from '@structures/priority-list/priority-list.structure';
import { RequestStateEvent } from '@events/request-state.event';
import { Comparator, GameState, Reducer } from 'shared';
import { RequestStateEventResolver } from '@resolvers/request-state-event.resolver';
import { ResponseStateEventResolver } from '@resolvers/response-state-event.resolver';
import { GameEventResolver } from '@resolvers/game-event.resolver';
import { ResponseStateEvent } from '@events/response-state.event';
import { GameConfig } from './game.config';
import { GameCalculator } from './game-calculator/game.calculator';
import { GameEvent } from '@events/game.event';

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
    const comparator: Comparator<RequestStateEvent> = {
      compare(item1: RequestStateEvent, item2: RequestStateEvent): number {
        return (item1.priority ?? 0) - (item2.priority ?? 0);
      },
    };
    this.pendingRequestEvents = new PriorityListStructure(comparator);
  }

  public receiveGameEventFromClient(gameRequestEvent: GameEvent): void {
    this.dispatchGameEvent(gameRequestEvent);
  }

  private dispatchGameEvent(gameRequestEvent: GameEvent): void {
    const requestEvent = GameEventResolver.resolve(
      this.gameCalculator,
      this.gameState,
      gameRequestEvent,
      this.pendingRequestEvents
    );
    this.pendingRequestEvents.add(requestEvent);

    this.gameState = this.resolveAllPendingGameEvents(this.gameState);
  }

  private resolveAllPendingGameEvents(readonlyGameState: Readonly<GameState>): GameState {
    let reducers: Reducer[] = [];
    let updatedGameState: GameState = readonlyGameState;
    let currentRequestEvent: RequestStateEvent | undefined;
    do {
      currentRequestEvent = this.pendingRequestEvents.poll();
      if (currentRequestEvent === undefined) {
        break;
      }
      const responseEvent: ResponseStateEvent = RequestStateEventResolver.resolve(
        this.gameCalculator,
        updatedGameState,
        currentRequestEvent,
        this.pendingRequestEvents
      );
      const reducer: Reducer = ResponseStateEventResolver.resolve(
        this.gameCalculator,
        updatedGameState,
        responseEvent,
        this.pendingRequestEvents
      );
      reducers.push(reducer); //Impl Note : always append to the end to preserve event priority
    } while (this.pendingRequestEvents.elements.length > 0);
    //once reducers are filled, apply all of them in order
    return reducers.reduce((state, reducer) => reducer(state), updatedGameState);
  }
}
