import { inject, Injectable } from '@angular/core';
import { WebsocketService } from '@core/services/websocket.service';
import { QueueService } from '@core/services/queue.service';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { routeConstants } from '@app/app.routes';
import { ProposalService } from '@core/services/proposal.service';
import { AuthenticationService } from '@core/services/authentication.service';

@Injectable()
export class HubUsecase {
  private readonly router = inject(Router);
  private readonly websocketService = inject(WebsocketService);
  private readonly authenticationService = inject(AuthenticationService);
  private readonly queueService = inject(QueueService);
  private readonly proposalService = inject(ProposalService);

  constructor() {
    this.proposalService.proposalReceived$.subscribe(serverMessage =>
      this.receivesProposal(serverMessage.payload?.proposalId)
    );
    this.proposalService.proposalAccepted$.subscribe(serverMessage =>
      this.receivesAcceptedProposal(serverMessage.payload?.gameId)
    );
    this.proposalService.proposalDeclined$.subscribe(serverMessage =>
      this.receivesDeclinedProposal(serverMessage.payload?.loginDeclined)
    );
    this.proposalService.proposalTimedOut$.subscribe(() => this.receivesTimedOutProposal());
  }

  public createWebsocketOrRedirect(login: string): void {
    if (login) {
      this.websocketService.createWebsocket(login);
    } else {
      from(this.router.navigate([routeConstants.LOGIN])).subscribe();
    }
  }

  public entersQueue(login: string): void {
    this.queueService.sendEnterQueue(login);
  }

  public leavesQueue(login: string): void {
    this.queueService.sendLeaveQueue(login);
  }

  public acceptsProposal(login: string): void {
    if (this.proposalService.hasProposal()) {
      this.proposalService.sendAcceptProposal(login);
    }
  }

  public declinesProposal(login: string): void {
    if (this.proposalService.hasProposal()) {
      this.proposalService.sendDeclineProposal(login);
    }
  }

  public receivesProposal(proposalId: string | undefined): void {
    this.proposalService.proposalAppears(proposalId);
    this.queueService.disablesQueue(true);
  }

  public receivesAcceptedProposal(gameId: string | undefined): void {
    this.proposalService.proposalDisappears();
    from(this.router.navigate([routeConstants.GAME])).subscribe();

    console.log('NEW GAME', gameId);
  }

  public receivesDeclinedProposal(loginDeclined: string | undefined): void {
    const login = this.authenticationService.login();
    this.proposalService.proposalDisappears();
    this.queueService.disablesQueue(false);
    if (login === loginDeclined) {
      this.queueService.dequeues();
    } else {
      this.queueService.queues();
    }
  }

  public receivesTimedOutProposal(): void {
    this.queueService.disablesQueue(false);
    if (this.proposalService.proposalAnswered()) {
      this.queueService.queues();
    } else {
      this.queueService.dequeues();
    }
    this.proposalService.proposalDisappears();
  }
}
