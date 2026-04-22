import {
  ArenaState,
  EffectState,
  GameState,
  GameStateTypeEnum,
  RobotState,
  TurnState,
  TurnStateTypeEnum,
} from 'shared';
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
    const gameConfig: GameConfig = {
      initialGameState: this.defineGameState(gameProposal),
      mapHeight: 10,
      mapWidth: 10,
    };
    return new Game(gameConfig);
  }

  private defineGameState(gameProposal: GameProposal): GameState {
    return {
      state: GameStateTypeEnum.PENDING,
      turnState: this.defineInitialTurnState(),
      arenaState: this.defineInitialArenaState(),
      effects: this.defineInitialEffectState(),
      robots: this.defineRobotStates(gameProposal),
    };
  }

  private defineRobotStates(gameProposal: GameProposal): Record<string, RobotState> {
    const robotStates: RobotState[] = gameProposal.logins as unknown as RobotState[]; //TODO get robotStates from logins
    return robotStates.reduce(
      (acc, curr) => {
        acc[curr.id] = curr;
        return acc;
      },
      {} as Record<string, RobotState>
    );
  }

  private defineInitialTurnState(): TurnState {
    return {
      currentTurnNumber: 0,
      turnStateTypeEnum: TurnStateTypeEnum.PENDING,
      currentTurnRobotId: '',
    };
  }

  private defineInitialArenaState(): ArenaState {
    throw 'not implemented yet';
  }

  private defineInitialEffectState(): EffectState[] {
    return [];
  }
}
