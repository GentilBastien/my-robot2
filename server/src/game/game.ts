import { PriorityListStructure } from '@structures/priority-list/priority-list.structure';
import { RequestEvent } from '@events/request.event';
import { Comparator, GameEventTypeEnum, GameState } from 'shared';
import { RequestEventResolver } from '@resolvers/request-event.resolver';
import { ResponseEventResolver } from '@resolvers/response-event.resolver';
import { GameEventResolver } from '@resolvers/game-event.resolver';
import { ResponseEvent } from '@events/response.event';
import { GameConfig } from './game.config';
import { GameCalculator } from './game-calculator/game.calculator';

/**
 * Receives GameEvents and ActionEvents, dispatch events to system and then resolvers to reduce them.
 */
export class Game {
  private gameState: GameState;
  private readonly gameCalculator: GameCalculator;
  private readonly pendingRequestEvents: PriorityListStructure<RequestEvent>;

  constructor(gameConfig: GameConfig) {
    this.gameState = gameConfig.gameState;
    this.gameCalculator = new GameCalculator(gameConfig);
    const comparator: Comparator<RequestEvent> = {
      compare(item1: RequestEvent, item2: RequestEvent): number {
        return (item1.priority ?? 0) - (item2.priority ?? 0);
      },
    };
    this.pendingRequestEvents = new PriorityListStructure(comparator);
  }

  public receiveGameEventFromClient(gameEventTypeEnum: GameEventTypeEnum): void {
    this.dispatchGameEvent(gameEventTypeEnum);
  }

  private dispatchGameEvent(gameEventTypeEnum: GameEventTypeEnum): void {
    const requestEvent = GameEventResolver.resolve(
      this.gameCalculator,
      this.gameState,
      gameEventTypeEnum,
      this.pendingRequestEvents
    );
    this.pendingRequestEvents.add(requestEvent);

    this.gameState = this.resolveAllPendingGameEvents(this.gameState);
  }

  private resolveAllPendingGameEvents(readonlyGameState: Readonly<GameState>): GameState {
    let updatedGameState: GameState = readonlyGameState;
    let currentRequestEvent: RequestEvent | undefined;
    do {
      currentRequestEvent = this.pendingRequestEvents.poll();
      if (currentRequestEvent === undefined) {
        break;
      }
      const responseEvent: ResponseEvent = RequestEventResolver.resolve(
        this.gameCalculator,
        updatedGameState,
        currentRequestEvent,
        this.pendingRequestEvents
      );
      updatedGameState = ResponseEventResolver.resolve(
        this.gameCalculator,
        updatedGameState,
        responseEvent,
        this.pendingRequestEvents
      );
    } while (this.pendingRequestEvents.elements.length > 0);
    return updatedGameState;
  }
}
