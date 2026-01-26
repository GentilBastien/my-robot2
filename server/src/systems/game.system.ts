import { GameEvent } from '@events/game.events';
import { GameState } from '@states/game-state';
import { TurnSystem } from '@systems/turn.system';
import { EffectSystem } from '@systems/effect.system';
import { EventPipeSystem } from '@systems/event-pipe.system';
import { PriorityListStructure } from '@structures/priority-list/priority-list.structure';

/**
 * Receives GameEvents and ActionEvents, dispatch events to system and then resolvers to reduce them.
 */
export class GameSystem {
  private gameState: GameState;
  private readonly pendingGameEvents: PriorityListStructure<GameEvent>;

  private readonly turnSystem = new TurnSystem();
  private readonly effectSystem = new EffectSystem();
  private readonly eventPipeSystem = new EventPipeSystem();

  constructor(initialState: GameState) {
    this.gameState = initialState;
    this.pendingGameEvents = new PriorityListStructure({
      compare(item1: GameEvent, item2: GameEvent): number {
        return (item1.priority ?? -1) - (item2.priority ?? -1);
      },
    });
  }

  public receiveGameEventFromClient(gameEvent: GameEvent): void {
    this.dispatchGameEvent(gameEvent);
  }

  private dispatchGameEvent(event: GameEvent): void {
    // Systems can eventually trigger more events related to the dispatched GameEvent
    const turnEvents = this.turnSystem.handleGameEvent(this.gameState, event);
    const effectEvents = this.effectSystem.handleGameEvent(this.gameState, event);

    // Reduce event -> new state
    this.gameState = this.eventPipeSystem.handleGameEvent(this.gameState, event, this.pendingGameEvents);

    // Eventually dispatch child GameEvents
    this.pendingGameEvents.elements.forEach(gameEvent => this.dispatchGameEvent(gameEvent));
  }
}
