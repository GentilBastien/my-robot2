import { GameProposal } from './game-proposal';
import { QueueManager } from '@structures/queue.manager';
import { SessionManager } from '@server/session/session.manager';
import { Session } from '@server-websocket/websocket.manager';

export class ProposalManager {
  private readonly queueManager = new QueueManager();
  private readonly proposals: Record<string, GameProposal> = {};
  private readonly sessionManager: SessionManager;

  constructor(sessionManager: SessionManager) {
    this.sessionManager = sessionManager;
    setInterval(() => this.tick(), 10000);
  }

  public joinQueue(login: string): void {
    this.queueManager.add(login);
  }

  public leaveQueue(login: string): void {
    this.queueManager.remove(login);
  }

  public createProposal(logins: string[]): GameProposal {
    const id = crypto.randomUUID();
    const proposal: GameProposal = {
      id,
      logins,
      accepted: new Set<string>(),
      declined: false,
      loginDeclined: undefined,
      createdAt: Date.now(),
      // timeout: setTimeout(() => this.timeOutProposal(proposal), 10000),
    };
    this.proposals[id] = proposal;
    return proposal;
  }

  /**
   * Accepts a Proposal and returns true if the proposal has been fully accepted and proc has been sent to clients
   */
  public acceptProposal(session: Session, proposalId: string): void {
    const proposal = this.proposals[proposalId];
    proposal.accepted.add(session.login);
    if (proposal.logins.length === proposal.accepted.size) {
      this.sessionManager.sendMatchAccepted(proposal);
      this.queueManager.removeAll(proposal.logins);
      this.removeProposal(proposal);
    }
  }

  public declineProposal(session: Session, proposalId: string): void {
    const proposal = this.proposals[proposalId];
    proposal.declined = true;
    proposal.loginDeclined = session.login;
    this.sessionManager.sendMatchCancelled(proposal);
    this.queueManager.addAll(Array.from(proposal.accepted));
    this.removeProposal(proposal);
  }

  public timeOutProposal(proposal: GameProposal): void {
    this.sessionManager.sendMatchTimedOut(proposal);
    this.queueManager.addAll(Array.from(proposal.accepted));
    this.removeProposal(proposal);
  }

  private removeProposal(proposal: GameProposal): void {
    delete this.proposals[proposal.id];
  }

  private tick(): void {
    this.processTimeouts();
    this.tryCreateProposal();
  }

  private processTimeouts(): void {
    const now = Date.now();
    for (const proposalId in this.proposals) {
      const gameProposal: GameProposal = this.proposals[proposalId];
      if (now - gameProposal.createdAt > 15000) {
        this.timeOutProposal(gameProposal);
      }
    }
  }

  private tryCreateProposal(): void {
    const loginsForProposal: string[] | null = this.queueManager.tryCreateProposal();
    if (loginsForProposal) {
      const gameProposal = this.createProposal(loginsForProposal);
      this.queueManager.removeAll(gameProposal.logins);
      this.sessionManager.sendGameProposal(gameProposal);
    }
  }
}
