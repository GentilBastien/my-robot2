import { GameState, GameStateTypeEnum, RobotState, TurnStateTypeEnum } from 'shared';
import { GameProposal } from '@server/proposal/game-proposal';
import { SessionManager } from '@server/session/session.manager';
import { Game } from '@game/game';
import { GameConfig } from '@game/game.config';

export class GameGenerator {
  private readonly games: Game[];

  constructor(sessionManager: SessionManager) {
    this.games = [];
  }

  private createNewGame(gameProposal: GameProposal): Game {
    const robotStates: RobotState[] = gameProposal.logins as unknown as RobotState[]; //TODO get robotStates from logins
    const gameConfig: GameConfig = {
      initialGameState: this.defineGameState(robotStates),
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
        cells: [],
      },
      effects: [],
      robots,
    };
  }
}
