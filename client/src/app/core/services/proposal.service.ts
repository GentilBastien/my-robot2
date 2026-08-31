import { inject, Injectable, signal } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { ClientMessageType } from 'shared';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class ProposalService {
  private readonly websocketService = inject(WebsocketService);

  public readonly hasProposal = signal<boolean>(false);

  private readonly proposalReceived$ = this.websocketService.proposalReceived$;
  private readonly proposalAccepted$ = this.websocketService.proposalAccepted$;
  private readonly proposalDeclined$ = this.websocketService.proposalDeclined$;
  private readonly proposalTimedOut$ = this.websocketService.proposalTimedOut$;

  constructor() {
    this.proposalReceived$
      .pipe(takeUntilDestroyed())
      .subscribe(serverMessage => this.proposalReceived(serverMessage.payload?.proposalId));
    this.proposalAccepted$
      .pipe(takeUntilDestroyed())
      .subscribe(serverMessage => this.proposalAccepted(serverMessage.payload?.gameId));
    this.proposalDeclined$
      .pipe(takeUntilDestroyed())
      .subscribe(serverMessage => this.proposalDeclined(serverMessage.payload?.loginDeclined));
    this.proposalTimedOut$.pipe(takeUntilDestroyed()).subscribe(() => this.proposalTimedOut());
  }

  public sendAcceptProposal(login: string): void {
    this.hasProposal.set(true);
    this.websocketService.sendToServer(login, ClientMessageType.ACCEPT_PROPOSAL);
  }

  public sendDeclineProposal(login: string): void {
    this.hasProposal.set(false);
    this.websocketService.sendToServer(login, ClientMessageType.DEQUEUE);
  }

  private proposalReceived(proposalId?: string): void {
    console.log('Websocket proposal received', proposalId);
  }

  private proposalAccepted(gameId?: string): void {
    console.log('Websocket proposal accepted', gameId);
  }

  private proposalDeclined(loginDeclined?: string): void {
    console.log('Websocket proposal declined', loginDeclined);
  }
  private proposalTimedOut(): void {
    console.log('Websocket proposal declined');
  }
}
