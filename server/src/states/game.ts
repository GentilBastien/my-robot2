import { GameStateTypeEnum } from 'shared';
import { ArenaManager } from '../managers/arena.manager';
import { GameEventResolver } from '../managers/game-event.resolver';
import { TurnManager } from '../managers/turn.manager';
import { Updatable } from '../managers/updatable';

export class Game implements Updatable {
  private state: GameStateTypeEnum;

  private readonly arenaManager = new ArenaManager();
  private readonly gameEventManager = new GameEventResolver();
  private readonly turnManager = new TurnManager();

  constructor() {
    this.state = GameStateTypeEnum.PENDING;
  }

  public update(): void {
    this.arenaManager.update();
    this.turnManager.update();
  }
}
