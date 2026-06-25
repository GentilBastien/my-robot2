import { GameState, PathCostCoordinate, Reducer } from 'shared';
import { GameConfig } from '@game/game.config';
import { RequestEvent } from '@events/request.event';
import { ArrayIndexStructure } from '@structures/array-index/array-index.structure';
import { resolveMaybeArray } from 'shared/dist/types/maybe';
import { GameCalculator } from '@calculators/game.calculator';

/**
 * Receives GameEvents and ActionEvents, dispatch events to system and then resolvers to reduce them.
 */
export class Game {
  private gameState: GameState;
  private readonly gameCalculator: GameCalculator;

  constructor(gameConfig: GameConfig) {
    this.gameState = gameConfig.initialGameState;
    this.gameCalculator = new GameCalculator(gameConfig);
    this.gameCalculator.update_1(this.gameState);
    this.gameCalculator.update_2(this.gameState);
  }

  public getPossiblePaths(robotId: string): PathCostCoordinate[] {
    return this.gameCalculator.getPossiblePaths(this.gameState, robotId);
  }

  public resolveEvent(request: RequestEvent): void {
    console.log('------------');
    this.gameState = this.resolveAllSubEvents(request);
    console.log('------------');
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
    const context = { gameState: currentState, gameCalculator: this.gameCalculator, pendingRequests };
    const response = request.mapToResponse(context);
    console.log(response);
    if (response.responseValidated) {
      const reducers: Reducer[] = resolveMaybeArray(response.mapToReducer(context));
      for (const reducer of reducers) {
        currentState = reducer(currentState);
      }
    }
    return currentState;
  }
}
