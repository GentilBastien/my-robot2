import { inject, Injectable } from '@angular/core';
import { WebsocketService } from '@core/services/websocket.service';
import { QueueService } from '@core/services/queue.service';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { routeConstants } from '@app/app.routes';
import { ProposalService } from '@core/services/proposal.service';
import { AuthenticationService } from '@core/services/authentication.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { GameService } from '@core/services/game.service';

@Injectable()
export class HubUsecase {
  private readonly router = inject(Router);
  private readonly websocketService = inject(WebsocketService);
  private readonly authenticationService = inject(AuthenticationService);
  private readonly queueService = inject(QueueService);
  private readonly proposalService = inject(ProposalService);
  private readonly gameService = inject(GameService);

  constructor() {
    this.websocketService.sendSession$
      .pipe(takeUntilDestroyed())
      .subscribe(serverMessage => this.receivesSession(serverMessage.payload?.gameId));
    this.proposalService.proposalReceived$
      .pipe(takeUntilDestroyed())
      .subscribe(serverMessage => this.receivesProposal(serverMessage.payload?.proposalId));
    this.proposalService.proposalAccepted$
      .pipe(takeUntilDestroyed())
      .subscribe(serverMessage => this.receivesAcceptedProposal(serverMessage.payload?.gameId));
    this.proposalService.proposalDeclined$
      .pipe(takeUntilDestroyed())
      .subscribe(serverMessage => this.receivesDeclinedProposal(serverMessage.payload?.loginDeclined));
    this.proposalService.proposalTimedOut$.pipe(takeUntilDestroyed()).subscribe(() => this.receivesTimedOutProposal());
  }

  /**
   * Creates the websocket when arriving to the hub.
   * @param login Client's login.
   */
  public createWebsocketOrRedirect(login: string): void {
    if (login) {
      this.websocketService.createWebsocket(login);
    }
  }

  /**
   * Client enters the queue.
   * @param login Client's login.
   */
  public entersQueue(login: string): void {
    this.queueService.sendEnterQueue(login);
  }

  /**
   * Client leaves the queue.
   * @param login Client's login.
   */
  public leavesQueue(login: string): void {
    this.queueService.sendLeaveQueue(login);
  }

  /**
   * Client accepts a proposal.
   * @param login Client's login.
   */
  public acceptsProposal(login: string): void {
    this.proposalService.sendAcceptProposal(login);
  }

  /**
   * Client declines a proposal.
   * @param login Client's login.
   */
  public declinesProposal(login: string): void {
    this.proposalService.sendDeclineProposal(login);
  }

  /**
   * Client receives a logged in confirmation.
   * @param gameId Game id.
   */
  public receivesSession(gameId: string | undefined): void {
    if (gameId) {
      console.log(gameId);
      this.queueService.disablesQueue(true);
      this.gameService.currentlyInGame(true);
    }
  }

  /**
   * Client receives a proposal.
   * @param proposalId Proposal id.
   */
  public receivesProposal(proposalId: string | undefined): void {
    this.proposalService.proposalAppears(proposalId);
    this.queueService.disablesQueue(true);
  }

  /**
   * Client receives a notification saying the proposal has been accepted by everyone.
   * @param gameId Game id.
   */
  public receivesAcceptedProposal(gameId: string | undefined): void {
    this.proposalService.proposalDisappears();
    from(this.router.navigate([routeConstants.GAME])).subscribe();

    console.log('NEW GAME', gameId);
  }

  /**
   * Client receives a notification saying the proposal has been declined by someone.
   * @param loginDeclined The client login that declined the proposal.
   */
  public receivesDeclinedProposal(loginDeclined: string | undefined): void {
    const login = this.authenticationService.login();
    this.queueService.disablesQueue(false);
    this.proposalService.proposalDisappears();
    if (login === loginDeclined) {
      this.queueService.dequeues();
    } else {
      this.queueService.queues();
    }
  }

  /**
   * Client receives a notification saying the proposal has not been answered in time by at least someone.
   */
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
