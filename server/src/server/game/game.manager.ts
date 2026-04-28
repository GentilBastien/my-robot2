import { createNewGame } from '@game/game-generator/game.generator';
import { GameProposal } from '@server/proposal/game-proposal';
import { GameSession } from '@server/game/game-session';
import { Session } from '@server/session/session';
import { SessionStateTypeEnum } from 'shared';

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

  public finishGame(gameSessionId: string): void {
    delete this.gameSessions[gameSessionId];
  }

  public getGameSession(login: string): GameSession {
    for (const gs of Object.values(this.gameSessions)) {
      if (gs.sessions.some(session => session.login === login)) {
        return gs;
      }
    }
    throw 'no game session found';
  }

  public getSession(login: string): Session {
    for (const gs of Object.values(this.gameSessions)) {
      const session: Session | undefined = gs.sessions.find(session => session.login === login);
      if (session) {
        return session;
      }
    }
    throw 'no session found';
  }

  public hasGameSession(login: string): boolean {
    return Object.values(this.gameSessions).some(gs => gs.sessions.some(session => session.login === login));
  }

  public updateGameSession(gameSessionId: string, session: Session): GameSession {
    const sessions: Session[] = this.gameSessions[gameSessionId].sessions;
    this.gameSessions[gameSessionId].sessions = sessions.map(s => (s.login === session.login ? session : s));
    return this.gameSessions[gameSessionId];
  }

  /**
   * Returns true if all client left the current {@link GameSession}.
   * That implies the client is not in a IN_GAME state or is in a different game.
   * @param gameSessionId The id of the {@link GameSession}.
   */
  public isGameSessionIdle(gameSessionId: string): boolean {
    const gs = this.gameSessions[gameSessionId];
    return gs.sessions.every(session => session.state !== SessionStateTypeEnum.IN_GAME || session.gameId !== gs.id);
  }

  public receiveTurnEnd(_session: Session): void {
    // const gameSession: GameSession | undefined = this.gameSessions.find(
    //   gameSession => !!gameSession.sessions.find(s => s.gameId === session.gameId)
    // );
    // console.log('received turn end, ', gameSession);
  }
}
