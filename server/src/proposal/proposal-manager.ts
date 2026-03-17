import { GameProposal } from './game-proposal';
import { QueueManager } from '@structures/queue.manager';
import { SessionManager } from '@server/session/session.manager';
import { SessionStateTypeEnum } from 'shared';
import { Session } from '@server-websocket/websocket.manager';

export class ProposalManager {
  private readonly queueManager = new QueueManager();
  private readonly proposals: Record<string, GameProposal> = {};
  private readonly sessionManager: SessionManager;

  constructor(sessionManager: SessionManager) {
    this.sessionManager = sessionManager;
    setInterval(() => this.tryCreateProposal(), 10000);
  }

  public joinQueue(session: Session): void {
    this.queueManager.add(session);
  }

  public tryCreateProposal(): void {
    const loginsForProposal: string[] | null = this.queueManager.tryCreateProposal();
    if (loginsForProposal) {
      const gameProposal = this.createProposal(loginsForProposal);
      this.sessionManager.sendGameProposal(gameProposal);
    }
  }

  public createProposal(logins: string[]): GameProposal {
    const id = crypto.randomUUID();
    const proposal: GameProposal = {
      id,
      logins,
      accepted: new Set<string>(),
      declined: false,
      loginDeclined: undefined,
      timeout: setTimeout(() => this.timeOutProposal(proposal), 10000),
    };
    this.proposals[id] = proposal;
    return proposal;
  }

  /**
   * Accepts a Proposal and returns true if the proposal has been fully accepted and proc has been sent to clients
   */
  public acceptProposal(session: Session, proposalId: string): boolean {
    const proposal = this.proposals[proposalId];
    proposal.accepted.add(session.login);
    if (proposal.logins.length === proposal.accepted.size) {
      this.sessionManager.sendMatchAccepted(proposal);
      this.removeProposal(proposal);
      return true;
    }
    return false;
  }

  public declineProposal(session: Session, proposalId: string): void {
    const proposal = this.proposals[proposalId];
    proposal.declined = true;
    proposal.loginDeclined = session.login;
    this.sessionManager.sendMatchCancelled(proposal);
    this.removeProposal(proposal);
  }

  public timeOutProposal(proposal: GameProposal): void {
    this.sessionManager.sendMatchTimedOut(proposal);
    this.removeProposal(proposal);
  }

  public removeProposal(proposal: GameProposal): void {
    clearTimeout(proposal.timeout);
    delete this.proposals[proposal.id];
  }

  private setSessionState(sessions: Session[], updatedState: SessionStateTypeEnum): void {
    sessions.forEach((session: Session) => (session.state = updatedState));
  }
}
