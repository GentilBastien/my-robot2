import { GameProposal } from './game-proposal';
import { QueueManager } from '@structures/queue.manager';
import { SessionManager } from '@server/session/session.manager';
import { SessionStateTypeEnum } from 'shared';

export class ProposalManager {
  private readonly queueManager = new QueueManager();
  private readonly proposals: Record<string, GameProposal> = {};
  private readonly sessionManager: SessionManager;

  constructor(sessionManager: SessionManager) {
    this.sessionManager = sessionManager;
  }

  public joinQueue(login: string): void {
    const session = this.sessionManager.getSession(login);
    if (session.state === SessionStateTypeEnum.ONLINE) {
      this.queueManager.add(session);
      const logins = this.queueManager.tryCreateGame();
      if (logins && logins.length > 0) {
        const gameProposal = this.createProposal(logins);
        this.sessionManager.sendGameProposal(gameProposal);
      }
    } else {
      throw 'Temp error, state must be online.';
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
      timeout: 10000,
    };
    this.proposals[id] = proposal;
    return proposal;
  }

  public acceptProposal(login: string, proposalId: string): boolean {
    const proposal = this.proposals[proposalId];
    proposal.accepted.add(login);
    return proposal.logins.length === proposal.accepted.size;
  }

  public declineProposal(login: string, proposalId: string): void {
    const proposal = this.proposals[proposalId];
    proposal.declined = true;
    proposal.loginDeclined = login;
  }

  public removeProposal(proposalId: string): void {
    delete this.proposals[proposalId];
  }
}
