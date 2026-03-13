import { Game } from './game';
import { GameConfig } from './game.config';
import { GameState, GameStateTypeEnum, TurnStateTypeEnum } from 'shared';

export class GameManager {
  private readonly games: Game[];

  constructor() {
    this.games = [];
  }

  private createEmptyGame(): Game {
    const gameConfig: GameConfig = {
      gameState: this.createEmptyGameState(),
      mapHeight: 10,
      mapWidth: 10,
    };
    return new Game(gameConfig);
  }

  private createEmptyGameState(): GameState {
    return {
      turnState: {
        currentTurnNumber: 0,
        turnStateTypeEnum: TurnStateTypeEnum.PENDING,
        currentTurnRobotId: '',
      },
      state: GameStateTypeEnum.PENDING,
      arenaState: {
        cells: {},
      },
      effects: [],
      robots: {},
    };
  }
}
