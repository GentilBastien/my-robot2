import { Session } from '@server-websocket/websocket.manager';
import WebSocket from 'ws';
import { SessionStateTypeEnum } from 'shared';
import { GameProposal } from '@proposal/game-proposal';
import { ProposalManager } from '@proposal/proposal-manager';

export class SessionManager {
  private readonly proposalManager: ProposalManager;
  private readonly sessions: Record<string, Session> = {};

  constructor() {
    this.proposalManager = new ProposalManager(this);
  }

  public register(login: string, webSocket: WebSocket): void {
    this.sessions[login] = { login, webSocket, state: SessionStateTypeEnum.ONLINE };
  }

  public unregister(ws: WebSocket): void {
    for (const login in this.sessions) {
      if (this.sessions[login].webSocket === ws) {
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

  public receiveJoinQueue(login: string): void {
    const session = this.sessions[login];
    this.proposalManager.joinQueue(session);
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
    //todo send to client
  }

  public sendMatchAccepted(gameProposal: GameProposal): void {
    //todo send to client
  }

  public sendMatchCancelled(gameProposal: GameProposal): void {
    //todo send to client
  }

  public sendMatchTimedOut(gameProposal: GameProposal): void {
    //todo send to client
  }
}
