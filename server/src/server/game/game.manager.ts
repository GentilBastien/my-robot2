import { createNewGame } from '@game/game-generator/game.generator';
import { GameProposal } from '@server/proposal/game-proposal';
import { GameSession } from '@server/game/game-session';
import { Session } from '@server/session/session';

export class GameManager {
  private readonly gameSessions: Record<string, GameSession>;

  constructor() {
    this.gameSessions = {};
  }

  public createGame(gameProposal: GameProposal, sessions: Session[]): void {
    const game = createNewGame(gameProposal);
    const gameId = gameProposal.id;
    this.gameSessions[gameId] = {
      id: gameId,
      game,
      createdAt: Date.now(),
      sessions,
    };
  }

  public getGameSession(login: string): GameSession | undefined {
    for (const gs of Object.values(this.gameSessions)) {
      if (gs.sessions.some(session => session.login === login)) {
        return gs;
      }
    }
    return undefined;
  }

  public updateGameSession(gameSessionId: string, session: Session): void {
    const sessions: Session[] = this.gameSessions[gameSessionId].sessions;
    this.gameSessions[gameSessionId].sessions = sessions.map(s => (s.login === session.login ? session : s));
  }

  /**
   * Returns true if all client left the current {@link GameSession}.
   * @param gameSessionId The id of the {@link GameSession}.
   */
  public isGameSessionIdle(gameSessionId: string): boolean {
    return this.gameSessions[gameSessionId].sessions.every(session => session.gameId === undefined);
  }

  public receiveTurnEnd(session: Session): void {
    // const gameSession: GameSession | undefined = this.gameSessions.find(
    //   gameSession => !!gameSession.sessions.find(s => s.gameId === session.gameId)
    // );
    // console.log('received turn end, ', gameSession);
  }
}
