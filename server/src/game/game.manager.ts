import { Game } from './game';
import { GameConfig } from './game.config';
import { GameState, GameStateTypeEnum, RobotState, TurnStateTypeEnum } from 'shared';
import { GameProposal } from '@proposal/game-proposal';

export class GameManager {
  private readonly games: Game[];

  constructor() {
    this.games = [];
  }

  private createNewGame(gameProposal: GameProposal): Game {
    const robotStates: RobotState[] = gameProposal.logins as unknown as RobotState[]; //TODO get robotStates from logins
    const gameConfig: GameConfig = {
      gameState: this.defineGameState(robotStates),
      mapHeight: 10,
      mapWidth: 10,
    };
    return new Game(gameConfig);
  }

  private defineGameState(robotStates: RobotState[]): GameState {
    const robots: Record<string, RobotState> = robotStates.reduce(
      (acc, curr) => {
        acc[curr.id] = curr;
        return acc;
      },
      {} as Record<string, RobotState>
    );
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
      robots,
    };
  }
}
