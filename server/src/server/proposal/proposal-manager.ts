import { GameProposal } from './game-proposal';
import { SessionManager } from '@server/session/session.manager';
import { Session } from '@server/session/session';

export class ProposalManager {
  private readonly proposals: Record<string, GameProposal> = {};
  private readonly sessionManager: SessionManager;

  constructor(sessionManager: SessionManager) {
    this.sessionManager = sessionManager;
    setInterval(() => this.tick(), 2000);
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
    };
    this.proposals[id] = proposal;
    return proposal;
  }

  public acceptProposal(session: Session, proposalId: string): void {
    const proposal = this.proposals[proposalId];
    this.checkSessionValidForProposal(session, proposal);
    if (proposal.loginDeclined === session.login) {
      throw 'tempError, proposal has been declined already';
    }
    proposal.accepted.add(session.login);
    if (this.proposalValidated(proposal)) {
      console.log('PROPOSAL FULLY ACCEPTED, MATCH ACCEPTED');
      this.sessionManager.sendGameProposalAccepted(proposal);
      this.removeProposal(proposal);
    }
  }

  public declineProposal(session: Session, proposalId: string): void {
    const proposal = this.proposals[proposalId];
    this.checkSessionValidForProposal(session, proposal);
    if (proposal.accepted.has(session.login)) {
      throw 'tempError, proposal has been accepted already';
    }
    proposal.declined = true;
    proposal.loginDeclined = session.login;
    this.sessionManager.sendGameProposalCancelled(proposal);
    this.removeProposal(proposal);
  }

  public timeOutProposal(proposal: GameProposal): void {
    if (!this.proposalValidated(proposal)) {
      this.sessionManager.sendGameProposalTimedOut(proposal);
      this.removeProposal(proposal);
    }
  }

  private proposalValidated(proposal: GameProposal): boolean {
    return proposal.logins.length === proposal.accepted.size;
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
    const loginsForProposal: string[] | null = this.sessionManager.matchmakingFromQueue();
    if (loginsForProposal) {
      const gameProposal = this.createProposal(loginsForProposal);
      this.sessionManager.sendGameProposal(gameProposal);
    }
  }

  private checkSessionValidForProposal(session: Session, gameProposal: GameProposal): void {
    if (!gameProposal.logins.includes(session.login)) {
      throw 'Temp error, login is not included in session';
    }
  }
}
