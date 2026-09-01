import { inject, Injectable, signal } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { ClientMessageType } from 'shared';

@Injectable({ providedIn: 'root' })
export class ProposalService {
  private readonly websocketService = inject(WebsocketService);

  /**
   * A proposal is being proposed to the client.
   */
  public readonly hasProposal = signal<boolean>(false);

  /**
   * Proposal id when being proposed to the client. Undefined if no proposal.
   */
  public readonly proposalId = signal<string | undefined>(undefined);

  /**
   * True when client answered the proposal, false if client has no proposal or if he has not responded yet.
   */
  public readonly proposalAnswered = signal<boolean>(false);

  /**
   * Server says a proposal has been received.
   */
  public readonly proposalReceived$ = this.websocketService.proposalReceived$;

  /**
   * Server says the proposal has been accepted by everyone.
   */
  public readonly proposalAccepted$ = this.websocketService.proposalAccepted$;

  /**
   * Server says proposal has been declined by someone.
   */
  public readonly proposalDeclined$ = this.websocketService.proposalDeclined$;

  /**
   * Server says proposal has not been responded in time by at least someone.
   */
  public readonly proposalTimedOut$ = this.websocketService.proposalTimedOut$;

  /**
   * The proposal appears, updating the state.
   * @param proposalId
   */
  public proposalAppears(proposalId: string | undefined): void {
    this.hasProposal.set(true);
    this.proposalId.set(proposalId);
    this.proposalAnswered.set(false);
  }

  /**
   * The proposal disappears, updating the state.
   */
  public proposalDisappears(): void {
    this.hasProposal.set(false);
    this.proposalId.set(undefined);
    this.proposalAnswered.set(false);
  }

  /**
   * The client accepts the proposal.
   * @param login The client's login.
   */
  public sendAcceptProposal(login: string): void {
    if (this.hasProposal() && !this.proposalAnswered()) {
      this.proposalAnswered.set(true);
      this.websocketService.sendToServer(login, ClientMessageType.ACCEPT_PROPOSAL, { proposalId: this.proposalId() });
    }
  }

  /**
   * The client declines the proposal.
   * @param login The client's login.
   */
  public sendDeclineProposal(login: string): void {
    if (this.hasProposal() && !this.proposalAnswered()) {
      this.proposalAnswered.set(true);
      this.websocketService.sendToServer(login, ClientMessageType.DECLINE_PROPOSAL, { proposalId: this.proposalId() });
    }
  }
}
