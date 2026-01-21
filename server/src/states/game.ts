import { GameStateTypeEnum } from 'shared';
import { ArenaManager } from '../managers/arena.manager';
import { TurnManager } from '../managers/turn.manager';
import { Updatable } from './updatable';
import { Subject } from 'rxjs';
import { GameEvent } from '../events/game-event';

export class Game implements Updatable {
  private state: GameStateTypeEnum;

  private readonly arenaManager = new ArenaManager();
  private readonly turnManager = new TurnManager();
  public readonly actionEvents$ = new Subject<GameEvent>();

  constructor() {
    this.state = GameStateTypeEnum.PENDING;
  }

  public update(): void {
    this.arenaManager.update();
    this.turnManager.update();
  }
}
