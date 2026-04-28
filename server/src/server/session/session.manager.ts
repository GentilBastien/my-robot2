import WebSocket from 'ws';
import { SessionStateTypeEnum } from 'shared';
import { GameProposal } from '@server/proposal/game-proposal';
import { ProposalManager } from '@server/proposal/proposal-manager';
import { Session } from '@server/session/session';
import { QueueManager } from '@server/queue/queue.manager';
import { GameManager } from '@server/game/game.manager';
import { GameSession } from '@server/game/game-session';

export class SessionManager {
  private readonly proposalManager: ProposalManager;
  private readonly gameManager: GameManager;
  private readonly queueManager = new QueueManager();
  private readonly sessions: Record<string, Session> = {};

  constructor() {
    this.proposalManager = new ProposalManager(this);
    this.gameManager = new GameManager();
  }

  public register(login: string, webSocket: WebSocket): void {
    this.sessions[login] = { login, webSocket, state: SessionStateTypeEnum.ONLINE };
    this.__printSessions();
  }

  public unregister(ws: WebSocket): void {
    for (const login in this.sessions) {
      const session = this.sessions[login];
      if (session.webSocket === ws) {
        if (session.state === SessionStateTypeEnum.IN_QUEUE) {
          this.queueManager.remove(session.login);
        }
        if (session.state === SessionStateTypeEnum.PROPOSAL_ASKING) {
          this.proposalManager.declineProposal(session, session.proposalId!);
        }
        if (session.state === SessionStateTypeEnum.IN_GAME) {
          const gameSession = this.gameManager.getGameSession(login);
          if (gameSession) {
            session.gameId = undefined;
            const newGameSession = this.gameManager.updateGameSession(gameSession.id, session);
            if (this.gameManager.isGameSessionIdle(newGameSession.id)) {
              this.sendMatchFinished(newGameSession);
            }
          }
        }
        delete this.sessions[login];
        this.__printSessions();
        return;
      }
    }
    throw 'Client not found';
  }

  public isAlreadyRegistered(login: string): boolean {
    return this.sessions[login] !== undefined;
  }

  public matchmakingFromQueue(): string[] | null {
    return this.queueManager.removeAllMatchedAndGet();
  }

  public receiveJoinQueue(login: string): void {
    const session = this.sessions[login];
    if (session.state !== SessionStateTypeEnum.ONLINE) {
      throw 'Must be online to enter queue';
    }
    this.queueManager.add(login);
    session.state = SessionStateTypeEnum.IN_QUEUE;
  }

  public receiveLeaveQueue(login: string): void {
    const session = this.sessions[login];
    if (session.state !== SessionStateTypeEnum.IN_QUEUE) {
      throw 'Must be in queue to leave queue';
    }
    this.queueManager.remove(login);
    session.state = SessionStateTypeEnum.ONLINE;
  }

  public receiveAcceptProposal(login: string, proposalId: string): void {
    const session = this.sessions[login];
    if (session.state !== SessionStateTypeEnum.PROPOSAL_ASKING) {
      throw 'Not in a good state to accept proposal';
    }
    session.state = SessionStateTypeEnum.PROPOSAL_ANSWERED;
    this.proposalManager.acceptProposal(session, proposalId);
  }

  public receiveDeclineProposal(login: string, proposalId: string): void {
    const session = this.sessions[login];
    if (session.state !== SessionStateTypeEnum.PROPOSAL_ASKING) {
      throw 'Not in a good state to decline proposal';
    }
    session.state = SessionStateTypeEnum.PROPOSAL_ANSWERED;
    this.proposalManager.declineProposal(session, proposalId);
  }

  public receiveLeaveGame(login: string): void {
    const session = this.sessions[login];
    if (session.state !== SessionStateTypeEnum.IN_GAME) {
      throw 'Must be in a game to leave game';
    }
    const gameSession = this.gameManager.getGameSession(login);
    if (gameSession) {
      session.state = SessionStateTypeEnum.ONLINE;
      session.proposalId = undefined;
      session.gameId = undefined;
      const newGameSession: GameSession = this.gameManager.updateGameSession(gameSession.id, session);
      if (this.gameManager.isGameSessionIdle(newGameSession.id)) {
        this.sendMatchFinished(newGameSession);
      }
    }
  }

  public receiveRejoinGame(login: string): void {
    const session = this.sessions[login];
    if (session.state !== SessionStateTypeEnum.ONLINE) {
      throw 'Must be in an online state to rejoin a game previously left';
    }
    if (session.gameId !== undefined) {
      throw 'still in a game, cannot rejoin it';
    }
    const gameSession = this.gameManager.getGameSession(login);
    if (gameSession) {
      session.state = SessionStateTypeEnum.IN_GAME;
      session.gameId = gameSession.id;
      this.gameManager.updateGameSession(gameSession.id, session);
    } else {
      throw 'no gameSession found to rejoin';
    }
  }

  public receiveTurnEnd(login: string): void {
    const session = this.sessions[login];
    if (session.state !== SessionStateTypeEnum.IN_GAME) {
      throw 'Must be in a game to endTurn';
    }
    this.gameManager.receiveTurnEnd(session);
  }

  public sendGameProposal(gameProposal: GameProposal): void {
    this.queueManager.removeAll(gameProposal.logins);
    this.updateSessionsAndSend(
      gameProposal.logins,
      session => {
        session.state = SessionStateTypeEnum.PROPOSAL_ASKING;
        session.proposalId = gameProposal.id;
      },
      session => session.webSocket.send(JSON.stringify({ type: 'SEND_PROPOSAL', proposalId: gameProposal.id }))
    );
  }

  public sendGameProposalAccepted(gameProposal: GameProposal): void {
    const sessions = this.updateSessionsAndSend(
      gameProposal.logins,
      session => {
        session.state = SessionStateTypeEnum.IN_GAME;
        session.proposalId = undefined;
        session.gameId = gameProposal.id;
      },
      session => session.webSocket.send(JSON.stringify({ type: 'PROPOSAL_ACCEPTED', gameId: gameProposal.id }))
    );
    this.gameManager.createGame(gameProposal, sessions);
  }

  public sendGameProposalCancelled(gameProposal: GameProposal): void {
    this.updateSessionsAndSend(
      gameProposal.logins,
      session => {
        session.proposalId = undefined;
        if (gameProposal.loginDeclined === session.login) {
          this.leaveQueue(session);
        } else {
          this.joinQueue(session);
        }
      },
      session =>
        session.webSocket.send(JSON.stringify({ type: 'PROPOSAL_DECLINED', loginDeclined: gameProposal.loginDeclined }))
    );
  }

  public sendGameProposalTimedOut(gameProposal: GameProposal): void {
    this.updateSessionsAndSend(
      gameProposal.logins,
      session => {
        session.proposalId = undefined;
        if (gameProposal.accepted.has(session.login)) {
          this.joinQueue(session);
        } else {
          this.leaveQueue(session);
        }
      },
      session => session.webSocket.send(JSON.stringify({ type: 'PROPOSAL_TIMED_OUT' }))
    );
  }

  public sendMatchFinished(gameSession: GameSession): void {
    this.gameManager.finishGame(gameSession.id);
    this.updateSessionsAndSend(
      gameSession.sessions.map(s => s.login),
      session => {
        session.state = SessionStateTypeEnum.ONLINE;
        session.proposalId = undefined;
        session.gameId = undefined;
      },
      session => session.webSocket.send(JSON.stringify({ type: 'MATCH_FINISHED' }))
    );
  }

  private joinQueue(session: Session): void {
    this.queueManager.add(session.login);
    session.state = SessionStateTypeEnum.IN_QUEUE;
  }

  private leaveQueue(session: Session): void {
    this.queueManager.remove(session.login);
    session.state = SessionStateTypeEnum.ONLINE;
  }

  private __printSessions(): void {
    console.log('sessions', Object.keys(this.sessions));
  }

  private updateSessionsAndSend(
    logins: string[],
    updateSessionFn: (session: Session) => void,
    sendFn: (session: Session) => void
  ): Session[] {
    const sessions = logins.map(login => this.sessions[login]).filter(s => s !== undefined);
    sessions.forEach(session => updateSessionFn(session));
    sessions.forEach(session => sendFn(session));
    return sessions;
  }
}
