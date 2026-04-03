import WebSocket from 'ws';
import { SessionStateTypeEnum } from 'shared';
import { GameProposal } from '@server/proposal/game-proposal';
import { ProposalManager } from '@server/proposal/proposal-manager';
import { Session } from '@server/session/session';
import { QueueManager } from '@structures/queue.manager';

export class SessionManager {
  private readonly proposalManager: ProposalManager;
  private readonly queueManager = new QueueManager();
  private readonly sessions: Record<string, Session> = {};

  constructor() {
    this.proposalManager = new ProposalManager(this);
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
          //todo, leave the game.
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
    if (session.state !== SessionStateTypeEnum.ONLINE) return;
    this.queueManager.add(login);
    session.state = SessionStateTypeEnum.IN_QUEUE;
  }

  public receiveLeaveQueue(login: string): void {
    const session = this.sessions[login];
    if (session.state !== SessionStateTypeEnum.IN_QUEUE) return;
    this.queueManager.remove(login);
    session.state = SessionStateTypeEnum.ONLINE;
  }

  public receiveAcceptProposal(login: string, proposalId: string): void {
    const session = this.sessions[login];
    if (session.state !== SessionStateTypeEnum.PROPOSAL_ASKING) {
      console.log('Not in a good state to accept proposal');
      return;
    }
    session.state = SessionStateTypeEnum.PROPOSAL_ANSWERED;
    this.proposalManager.acceptProposal(session, proposalId);
  }

  public receiveDeclineProposal(login: string, proposalId: string): void {
    const session = this.sessions[login];
    if (session.state !== SessionStateTypeEnum.PROPOSAL_ASKING) {
      console.log('Not in a good state to decline proposal');
      return;
    }
    session.state = SessionStateTypeEnum.PROPOSAL_ANSWERED;
    this.proposalManager.declineProposal(session, proposalId);
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
    this.updateSessionsAndSend(
      gameProposal.logins,
      session => {
        session.state = SessionStateTypeEnum.IN_GAME;
        session.proposalId = undefined;
        session.gameId = undefined; //TODO define game ID
      },
      session => session.webSocket.send(JSON.stringify({ type: 'PROPOSAL_ACCEPTED' }))
    );
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

  public sendMatchFinished(gameProposal: GameProposal): void {
    this.updateSessionsAndSend(
      gameProposal.logins,
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
  ): void {
    const sessions = logins.map(login => this.sessions[login]);
    sessions.forEach(session => updateSessionFn(session));
    sessions.forEach(session => sendFn(session));
  }
}
