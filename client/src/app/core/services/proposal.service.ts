import { inject, Injectable, signal } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { ClientMessageType } from 'shared';

@Injectable({ providedIn: 'root' })
export class ProposalService {
  private readonly websocketService = inject(WebsocketService);

  public readonly hasProposal = signal<boolean>(false);
  public readonly proposalId = signal<string | undefined>(undefined);
  public readonly proposalAnswered = signal<boolean>(false);

  public readonly proposalReceived$ = this.websocketService.proposalReceived$;
  public readonly proposalAccepted$ = this.websocketService.proposalAccepted$;
  public readonly proposalDeclined$ = this.websocketService.proposalDeclined$;
  public readonly proposalTimedOut$ = this.websocketService.proposalTimedOut$;

  public proposalAppears(proposalId: string | undefined): void {
    this.hasProposal.set(true);
    this.proposalId.set(proposalId);
    this.proposalAnswered.set(false);
  }

  public proposalDisappears(): void {
    this.hasProposal.set(false);
    this.proposalId.set(undefined);
    this.proposalAnswered.set(false);
  }

  public sendAcceptProposal(login: string): void {
    this.proposalAnswered.set(true);
    this.websocketService.sendToServer(login, ClientMessageType.ACCEPT_PROPOSAL, { proposalId: this.proposalId() });
  }

  public sendDeclineProposal(login: string): void {
    this.proposalAnswered.set(true);
    this.websocketService.sendToServer(login, ClientMessageType.DECLINE_PROPOSAL, { proposalId: this.proposalId() });
  }
}
