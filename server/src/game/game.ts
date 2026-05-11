import { PriorityListStructure } from '@structures/priority-list/priority-list.structure';
import { RequestStateEvent } from '@events/request-state.event';
import { Comparator, GameEvent, GameState, PathCostCoordinate, Reducer } from 'shared';
import { requestStateEventResolver } from '@resolvers/request-state-event.resolver';
import { responseStateEventResolver } from '@resolvers/response-state-event.resolver';
import { gameEventResolver } from '@resolvers/game-event.resolver';
import { ResponseStateEvent } from '@events/response-state.event';
import { GameCalculator } from '@game/game-calculator/game.calculator';
import { GameConfig } from '@game/game.config';

/**
 * Receives GameEvents and ActionEvents, dispatch events to system and then resolvers to reduce them.
 */
export class Game {
  private gameState: GameState;
  private readonly gameCalculator: GameCalculator;
  private readonly pendingRequestEvents: PriorityListStructure<RequestStateEvent>;

  constructor(gameConfig: GameConfig) {
    this.gameState = gameConfig.initialGameState;
    this.gameCalculator = new GameCalculator(gameConfig);
    this.gameCalculator.update_1(this.gameState);
    this.gameCalculator.update_2(this.gameState);

    const comparator: Comparator<RequestStateEvent> = (item1: RequestStateEvent, item2: RequestStateEvent): number =>
      (item1.priority ?? 0) - (item2.priority ?? 0);
    this.pendingRequestEvents = new PriorityListStructure(comparator);
  }

  public getPossibleTargets(robotId: string): PathCostCoordinate[] {
    return this.gameCalculator.getPossiblePaths(this.gameState, robotId);
  }

  public receiveGameEventFromClient<GAME_EVENT extends GameEvent>(gameRequestEvent: GAME_EVENT): void {
    this.resolveGameEvent(gameRequestEvent);
  }

  private resolveGameEvent(gameRequestEvent: GameEvent): void {
    const requestEvent: RequestStateEvent = gameEventResolver(gameRequestEvent);
    this.pendingRequestEvents.add(requestEvent);
    const reducers: Reducer[] = this.resolveAllPendingRequestEvents(this.gameState);
    this.gameState = this.applyReducers(this.gameState, reducers);
    this.gameCalculator.update_1(this.gameState);
  }

  private resolveAllPendingRequestEvents(readonlyGameState: Readonly<GameState>): Reducer[] {
    const responseEvents: ResponseStateEvent[] = [];
    const reducers: Reducer[] = [];
    let currentRequestEvent: RequestStateEvent | undefined;
    do {
      currentRequestEvent = this.pendingRequestEvents.poll();
      if (currentRequestEvent === undefined) {
        break;
      }
      //Impl Note : requestEvents are mapped to responseEvents, while keeping its ordering.
      const responseEventsFromRequest: ResponseStateEvent[] = requestStateEventResolver(
        this.gameCalculator,
        readonlyGameState,
        currentRequestEvent
      );
      responseEvents.push(...responseEventsFromRequest);
      //Impl Note : responseEvents are mapped to reducers, while keeping its ordering.
      const reducers123: Reducer[] = responseEventsFromRequest
        .map(responseEvent =>
          responseStateEventResolver(this.gameCalculator, readonlyGameState, responseEvent, this.pendingRequestEvents)
        )
        .filter(r => r !== null);
      reducers.push(...reducers123);
    } while (this.pendingRequestEvents.elements.length > 0);
    console.log('--------------------------------------------');
    console.log(responseEvents);
    console.log('--------------------------------------------');
    return reducers;
  }

  /**
   * Apply all Reducers in order.
   * @param readonlyGameState
   * @param reducers
   */
  private applyReducers(readonlyGameState: Readonly<GameState>, reducers: Reducer[]): GameState {
    return reducers.reduce((state, reducer) => reducer(state), readonlyGameState);
  }
}
