import { GameState, PathCostCoordinate, Reducer, resolveMaybeArray } from 'shared';
import { GameConfig } from '@game/game.config';
import { RequestEvent } from '@events/request.event';
import { ArrayIndexStructure } from '@structures/array-index/array-index.structure';
import { GameStateHandler } from '@game/game.state-handler';
import { CellCalculator } from '@calculators/cell.calculator';
import { ContextEvent } from '@events/context.event';
import { ResponseEvent } from '@events/response.event';

/**
 * Receives GameEvents and ActionEvents, dispatch events to system and then resolvers to reduce them.
 */
export class Game {
  private gameState: GameState;
  private readonly gameStateHandler: GameStateHandler;

  constructor(gameConfig: GameConfig) {
    this.gameState = gameConfig.initialGameState;
    this.gameStateHandler = new GameStateHandler(gameConfig);
    this.gameStateHandler.updateCyclicListState(this.gameState);
    this.gameStateHandler.updateHexagonalGridState(this.gameState);
  }

  public getPossiblePaths(robotId: string): PathCostCoordinate[] {
    const context: ContextEvent = this.getGameContext({ gameState: this.gameState });
    return CellCalculator.getPossiblePaths(context, robotId);
  }

  public resolveEvent(request: RequestEvent): GameState {
    console.log('------------');
    this.gameState = this.resolveAllSubEvents(request);
    console.log('------------');
    return this.gameState;
  }

  public getGameState(): GameState {
    return this.gameState;
  }

  private resolveAllSubEvents(request: RequestEvent): GameState {
    let tempGameState: GameState = this.gameState;
    const pendingRequests = new ArrayIndexStructure<RequestEvent>([request]);
    while (pendingRequests.size() > 0) {
      const firstRequest = pendingRequests.consumeFirst();
      if (firstRequest) {
        tempGameState = this.resolveEventAndQueue(firstRequest, tempGameState, pendingRequests);
      }
    }
    return tempGameState;
  }

  private resolveEventAndQueue(
    request: RequestEvent,
    currentState: GameState,
    pendingRequests: ArrayIndexStructure<RequestEvent>
  ): GameState {
    const context: ContextEvent = this.getGameContext({ gameState: currentState, pendingRequests });
    console.log(request);
    const response: ResponseEvent = request.mapToResponse(context);
    console.log(response);
    if (response.responseValidated) {
      const reducers: Reducer[] = resolveMaybeArray(response.mapToReducer(context));
      for (const reducer of reducers) {
        currentState = reducer(currentState);
      }
    }
    return currentState;
  }

  private getGameContext(options?: {
    gameState: GameState;
    pendingRequests?: ArrayIndexStructure<RequestEvent>;
  }): ContextEvent {
    return {
      gameState: options?.gameState ?? this.gameState,
      gameStateHandler: this.gameStateHandler,
      pendingRequests: options?.pendingRequests ?? new ArrayIndexStructure<RequestEvent>(),
    };
  }
}
