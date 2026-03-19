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
  }

  public unregister(ws: WebSocket): void {
    for (const login in this.sessions) {
      const session = this.sessions[login];
      if (session.webSocket === ws) {
        if (session.state === SessionStateTypeEnum.IN_QUEUE) {
          this.queueManager.remove(session.login);
        }
        if (session.state === SessionStateTypeEnum.IN_PROPOSAL) {
          this.proposalManager.declineProposal(session, session.proposalId!);
        }
        if (session.state === SessionStateTypeEnum.IN_GAME) {
          //todo, leave the game.
        }
        delete this.sessions[login];
        return;
      }
    }
    throw 'Client not found';
  }

  public getSession(login: string): Session {
    return this.sessions[login];
  }

  public isAlreadyRegistered(login: string): boolean {
    return this.sessions[login] !== undefined;
  }

  public matchmakingFromQueue(): string[] | null {
    return this.queueManager.removeAndGet();
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
    this.proposalManager.acceptProposal(session, proposalId);
  }

  public receiveDeclineProposal(login: string, proposalId: string): void {
    const session = this.sessions[login];
    this.proposalManager.declineProposal(session, proposalId);
  }

  public sendGameProposal(gameProposal: GameProposal): void {
    this.queueManager.removeAll(gameProposal.logins);
    for (const login in gameProposal.logins) {
      const session = this.sessions[login];
      session.state = SessionStateTypeEnum.IN_PROPOSAL;
      session.proposalId = gameProposal.id;
    }
    //todo send to client
  }

  public sendMatchAccepted(gameProposal: GameProposal): void {
    for (const login in gameProposal.logins) {
      const session = this.sessions[login];
      session.state = SessionStateTypeEnum.IN_GAME;
      session.proposalId = undefined;
    }
    //todo send to client
  }

  public sendMatchCancelled(gameProposal: GameProposal): void {
    for (const login in gameProposal.logins) {
      const session = this.sessions[login];
      session.proposalId = undefined;
      if (gameProposal.loginDeclined === login) {
        this.leaveQueue(session);
      } else {
        this.joinQueue(session);
      }
    }
    //todo send to client
  }

  public sendMatchTimedOut(gameProposal: GameProposal): void {
    for (const login in gameProposal.logins) {
      const session = this.sessions[login];
      session.proposalId = undefined;
      if (gameProposal.accepted.has(login)) {
        this.leaveQueue(session);
      } else {
        this.joinQueue(session);
      }
    }
    //todo send to client
  }

  private joinQueue(session: Session): void {
    this.queueManager.add(session.login);
    session.state = SessionStateTypeEnum.IN_QUEUE;
  }

  private leaveQueue(session: Session): void {
    this.queueManager.remove(session.login);
    session.state = SessionStateTypeEnum.ONLINE;
  }
}
