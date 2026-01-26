import { GameState } from '@states/game-state';
import { GameEvent } from '@events/game.events';

export class ArenaSystem {
  public handleGameEvent(state: GameState, event: GameEvent): GameEvent[] {
    switch (event.gameEventType) {
      default:
        return [];
    }
  }
}
