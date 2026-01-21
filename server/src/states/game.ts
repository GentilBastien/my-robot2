import { GameStateTypeEnum } from 'shared';
import { ArenaManager } from '../managers/arena.manager';
import { TurnManager } from '../managers/turn.manager';
import { Updatable } from './updatable';
import { EventManager } from '../managers/event.manager';
import { GameEvent } from '../events/game-event';

export class Game implements Updatable {
  private state: GameStateTypeEnum;

  private readonly eventManager = new EventManager();
  private readonly arenaManager = new ArenaManager();
  private readonly turnManager = new TurnManager();

  constructor() {
    this.state = GameStateTypeEnum.PENDING;
  }

  public onGameEvent(gameEvent: GameEvent) {
    this.eventManager.manageGameEvent(this, gameEvent);
  }

  public update(): void {
    this.arenaManager.update();
    this.turnManager.update();
  }
}
