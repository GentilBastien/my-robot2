import { Component, inject, OnInit } from '@angular/core';
import { AuthenticationService } from '@core/services/authentication.service';
import { QueueService } from '@core/services/queue.service';
import { HubUsecase } from '@app/pages/hub/hub.usecase';
import { ProposalService } from '@core/services/proposal.service';

@Component({
  selector: 'mr2-hub-page',
  imports: [],
  providers: [HubUsecase],
  templateUrl: './hub-page.html',
  styleUrl: './hub-page.scss',
})
export class HubPage implements OnInit {
  private readonly authenticationService = inject(AuthenticationService);
  private readonly queueService = inject(QueueService);
  private readonly proposalService = inject(ProposalService);
  private readonly hubUsecase = inject(HubUsecase);

  protected login = this.authenticationService.login;
  protected inQueue = this.queueService.inQueue;
  protected queueDisabled = this.queueService.queueDisabled;
  protected hasProposal = this.proposalService.hasProposal;
  protected proposalAnswered = this.proposalService.proposalAnswered;

  public ngOnInit(): void {
    this.hubUsecase.createWebsocketOrRedirect(this.login());
  }

  protected onEnterQueue(): void {
    this.hubUsecase.entersQueue(this.login());
  }

  protected onLeaveQueue(): void {
    this.hubUsecase.leavesQueue(this.login());
  }

  protected onAcceptProposal(): void {
    this.hubUsecase.acceptsProposal(this.login());
  }

  protected onDeclineProposal(): void {
    this.hubUsecase.declinesProposal(this.login());
  }

  protected onRejoinGame(): void {}
}
