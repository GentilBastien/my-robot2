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
      const session = this.sessions[login];
      if (session.webSocket === ws) {
        if (session.state === SessionStateTypeEnum.IN_QUEUE) {
          this.proposalManager.leaveQueue(session.login);
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

  //todo call this method
  public receiveJoinQueue(login: string): void {
    this.proposalManager.joinQueue(login);
    this.setSessionState([login], SessionStateTypeEnum.IN_QUEUE);
  }

  //todo call this method
  public receiveLeaveQueue(login: string): void {
    this.proposalManager.leaveQueue(login);
    this.setSessionState([login], SessionStateTypeEnum.ONLINE);
  }

  //todo call this method
  public receiveAcceptProposal(login: string, proposalId: string): void {
    const session = this.sessions[login];
    this.proposalManager.acceptProposal(session, proposalId);
  }

  //todo call this method
  public receiveDeclineProposal(login: string, proposalId: string): void {
    const session = this.sessions[login];
    this.proposalManager.declineProposal(session, proposalId);
  }

  public sendGameProposal(gameProposal: GameProposal): void {
    this.setSessionState(gameProposal.logins, SessionStateTypeEnum.IN_PROPOSAL);
    this.setSessionProposalId(gameProposal.logins, gameProposal.id);
    //todo send to client
  }

  public sendMatchAccepted(gameProposal: GameProposal): void {
    this.setSessionState(gameProposal.logins, SessionStateTypeEnum.IN_GAME);
    this.setSessionProposalId(gameProposal.logins, undefined);
    //todo send to client
  }

  public sendMatchCancelled(gameProposal: GameProposal): void {
    const acceptedLogins: string[] = Array.from(gameProposal.accepted);
    const declinedLogin: string = gameProposal.loginDeclined!;
    this.setSessionState(acceptedLogins, SessionStateTypeEnum.IN_QUEUE);
    this.setSessionState([declinedLogin], SessionStateTypeEnum.ONLINE);
    this.setSessionProposalId(gameProposal.logins, undefined);
    //todo send to client
  }

  public sendMatchTimedOut(gameProposal: GameProposal): void {
    const acceptedLogins = Array.from(gameProposal.accepted);
    const noResponseLogins = gameProposal.logins.filter(login => !gameProposal.accepted.has(login));
    this.setSessionState(acceptedLogins, SessionStateTypeEnum.IN_QUEUE);
    this.setSessionState(noResponseLogins, SessionStateTypeEnum.ONLINE);
    this.setSessionProposalId(gameProposal.logins, undefined);
    //todo send to client
  }

  private setSessionState(logins: string[], updatedState: SessionStateTypeEnum): void {
    logins.map(login => this.sessions[login]).forEach((session: Session) => (session.state = updatedState));
  }

  private setSessionProposalId(logins: string[], gameProposalId: string | undefined): void {
    logins.map(login => this.sessions[login]).forEach((session: Session) => (session.proposalId = gameProposalId));
  }
}
