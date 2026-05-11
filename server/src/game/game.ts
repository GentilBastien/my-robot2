import { GameState, PathCostCoordinate } from 'shared';
import { GameConfig } from '@game/game.config';
import { RequestEvent } from '@events/request.event';
import { GameCalculator } from '@game/game-calculator/game.calculator';

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

  public getPossibleTargets(robotId: string): PathCostCoordinate[] {
    return this.gameCalculator.getPossiblePaths(this.gameState, robotId);
  }

  public resolveEvent(request: RequestEvent): void {
    this.gameState = this.resolveAllSubEvents(request);
  }

  private resolveAllSubEvents(request: RequestEvent): GameState {
    let tempGameState: GameState = this.gameState;
    const pendingRequests: RequestEvent[] = [request];
    do {
      const firstRequest = pendingRequests.shift();
      if (firstRequest) {
        tempGameState = this.resolveEventAndQueue(firstRequest, pendingRequests);
      }
    } while (pendingRequests.length > 0);
    return tempGameState;
  }

  private resolveEventAndQueue(request: RequestEvent, pendingRequests: RequestEvent[]): GameState {
    const response = request.mapToResponse({
      gameState: this.gameState,
      gameCalculator: this.gameCalculator,
      pendingRequests,
    });
    const reducer = response.mapToReducer({
      gameState: this.gameState,
      gameCalculator: this.gameCalculator,
      pendingRequests,
    });
    if (reducer !== null) {
      return reducer(this.gameState);
    } else {
      return this.gameState;
    }
  }
}
