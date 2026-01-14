import { GameStateTypeEnum, Updatable } from 'shared';
import { ArenaManager } from '../managers/arena.manager';
import { ActionManager } from '../managers/action.manager';
import { TurnManager } from '../managers/turn.manager';

export class Game implements Updatable {
  private state: GameStateTypeEnum;

  private readonly arenaManager = new ArenaManager();
  private readonly actionManager = new ActionManager();
  private readonly turnManager = new TurnManager();

  constructor() {
    this.state = GameStateTypeEnum.PENDING;
  }

  public update(): void {
    this.arenaManager.update();
    this.turnManager.update();
  }
}
