import { GameEvent } from '@events/game.events';
import { GameState } from '@states/game-state';
import { PriorityListStructure } from '@structures/priority-list/priority-list.structure';
import { TurnEventHandler } from '@handlers/turn.event-handler';
import { EffectEventHandler } from '@handlers/effect.event-handler';
import { EventPipeEventHandler } from '@handlers/event-pipe.event-handler';
import { ArenaEventHandler } from '@handlers/arena.event-handler';

/**
 * Receives GameEvents and ActionEvents, dispatch events to system and then resolvers to reduce them.
 */
export class GameEventHandler {
  private gameState: GameState;
  private readonly pendingGameEvents: PriorityListStructure<GameEvent>;

  private readonly turnEventHandler = new TurnEventHandler();
  private readonly effectEventHandler = new EffectEventHandler();
  private readonly eventPipeEventHandler = new EventPipeEventHandler();
  private readonly arenaEventHandler = new ArenaEventHandler();

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
    // Systems can eventually trigger more GameEvents related to the dispatched GameEvent
    // For example a NEXT_TURN GameEvent will trigger all effects GameEvents that must be reapplied every turn.
    const turnEvents = this.turnEventHandler.handleGameEvent(this.gameState, event);
    const effectEvents = this.effectEventHandler.handleGameEvent(this.gameState, event);
    const arenaEvents = this.arenaEventHandler.handleGameEvent(this.gameState, event);

    // Reduce event -> new state
    this.gameState = this.eventPipeEventHandler.handleGameEvent(this.gameState, event, this.pendingGameEvents);

    // if child GameEvents, dispatch them as well
    this.pendingGameEvents.elements.forEach(gameEvent => this.dispatchGameEvent(gameEvent));
  }
}
