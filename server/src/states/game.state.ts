import { GameStateTypeEnum } from 'shared';
import { ArenaManager } from '../managers/arena.manager';
import { GameEventManager } from '../managers/game-event.manager';
import { TurnManager } from '../managers/turn.manager';
import { Updatable } from '../managers/updatable';

export class GameState implements Updatable {
  private state: GameStateTypeEnum;

  private readonly arenaManager = new ArenaManager();
  private readonly actionManager = new GameEventManager();
  private readonly turnManager = new TurnManager();

  constructor() {
    this.state = GameStateTypeEnum.PENDING;
  }

  public update(): void {
    this.arenaManager.update();
    this.turnManager.update();
  }
}
