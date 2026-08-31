import { Component, inject, OnInit } from '@angular/core';
import { AuthenticationService } from '@core/services/authentication.service';
import { QueueService } from '@core/services/queue.service';
import { HubUsecase } from '@app/pages/hub/hub.usecase';

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
  private readonly hubUsecase = inject(HubUsecase);

  protected login = this.authenticationService.login;
  protected inQueue = this.queueService.inQueue;

  public ngOnInit(): void {
    this.hubUsecase.createWebsocketOrRedirect(this.login());
  }

  protected onEnterQueue(): void {
    this.hubUsecase.enterQueue(this.login());
  }

  protected onLeaveQueue(): void {
    this.hubUsecase.leaveQueue(this.login());
  }

  protected onRejoinGame(): void {}
}
