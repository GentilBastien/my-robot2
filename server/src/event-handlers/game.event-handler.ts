import { GameEvent } from '@events/game.events';
import { GameState } from '@states/game-state';
import { PriorityListStructure } from '@structures/priority-list/priority-list.structure';
import { TurnEventHandler } from '@handlers/turn.event-handler';
import { EffectEventHandler } from '@handlers/effect.event-handler';
import { EventPipeEventHandler } from '@handlers/event-pipe.event-handler';

/**
 * Receives GameEvents and ActionEvents, dispatch events to system and then resolvers to reduce them.
 */
export class GameEventHandler {
  private gameState: GameState;
  private readonly pendingGameEvents: PriorityListStructure<GameEvent>;

  private readonly turnEventHandler = new TurnEventHandler();
  private readonly effectEventHandler = new EffectEventHandler();
  private readonly eventPipeEventHandler = new EventPipeEventHandler();

  constructor(initialState: GameState) {
    this.gameState = initialState;
    this.pendingGameEvents = new PriorityListStructure({
      compare(item1: GameEvent, item2: GameEvent): number {
        return (item1.priority ?? -1) - (item2.priority ?? -1);
      },
    });
  }

  public receiveGameEventFromClient(gameEvent: GameEvent): void {
    // more likely "empty" GameEvents like
    // TurnGameEvent {
    //   gameEventType: GameEventTypeEnum.TURN_START,
    // }
    // the goal is to have
    // TurnGameEvent {
    //   gameEventType: GameEventTypeEnum.TURN_START,
    //   turnNumber: 5,
    //   turnRobotId: 72,
    // };
    this.dispatchGameEvent(gameEvent);
  }

  private dispatchGameEvent(event: GameEvent): void {
    // Systems can eventually trigger more GameEvents related to the dispatched GameEvent
    // For example a NEXT_TURN GameEvent will trigger all effects GameEvents that must be reapplied every turn.
    // It can also populate more accurately an event since all GameEvent properties are optional
    const turnEvents = this.turnEventHandler.handleGameEvent(this.gameState, event);
    const effectEvents = this.effectEventHandler.handleGameEvent(this.gameState, event);

    // Reduce event -> new state
    this.gameState = this.eventPipeEventHandler.handleGameEvent(this.gameState, event, this.pendingGameEvents);

    // if child GameEvents, dispatch them as well
    this.pendingGameEvents.elements.forEach(gameEvent => this.dispatchGameEvent(gameEvent));
  }
}
