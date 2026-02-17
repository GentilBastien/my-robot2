import { PriorityListStructure } from '@structures/priority-list/priority-list.structure';
import { RequestStateEvent } from '@events/request-state.event';
import { Comparator, GameEventTypeEnum, GameState, Reducer } from 'shared';
import { requestStateEventResolver } from '@resolvers/request-state-event.resolver';
import { responseStateEventResolver } from '@resolvers/response-state-event.resolver';
import { gameEventResolver } from '@resolvers/game-event.resolver';
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

  public clientTurnEnded(robotId: string): void {
    const endTurnGameEvent: GameEvent = {
      gameEventType: GameEventTypeEnum.TURN_END,
      sourceRobotId: robotId,
    };
  }

  public receiveGameEventFromClient(gameRequestEvent: GameEvent): void {
    this.dispatchGameEvent(gameRequestEvent);
  }

  private dispatchGameEvent(gameRequestEvent: GameEvent): void {
    const requestEvent = gameEventResolver(gameRequestEvent);
    this.pendingRequestEvents.addAll(requestEvent);
    this.gameState = this.resolveAllPendingGameEvents(this.gameState);
  }

  private resolveAllPendingGameEvents(readonlyGameState: Readonly<GameState>): GameState {
    const reducers: Reducer[] = [];
    let currentRequestEvent: RequestStateEvent | undefined;

    do {
      currentRequestEvent = this.pendingRequestEvents.poll();
      if (currentRequestEvent === undefined) {
        break;
      }
      const responseEvent: ResponseStateEvent = requestStateEventResolver(
        this.gameCalculator,
        readonlyGameState,
        currentRequestEvent
      );
      const reducer: Reducer = responseStateEventResolver(
        this.gameCalculator,
        readonlyGameState,
        responseEvent,
        this.pendingRequestEvents
      );
      reducers.push(reducer); //Impl Note : always append to the end to preserve event priority
    } while (this.pendingRequestEvents.elements.length > 0);
    //once reducers are filled and pendingEvents consumed, apply all of them in order
    return reducers.reduce((state, reducer) => reducer(state), readonlyGameState);
  }
}
