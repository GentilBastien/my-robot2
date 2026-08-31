import { inject, Injectable } from '@angular/core';
import { WebsocketService } from '@core/services/websocket.service';
import { QueueService } from '@core/services/queue.service';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { routeConstants } from '@app/app.routes';
import { ProposalService } from '@core/services/proposal.service';

@Injectable()
export class HubUsecase {
  private readonly router = inject(Router);
  private readonly websocketService = inject(WebsocketService);
  private readonly queueService = inject(QueueService);
  private readonly proposalService = inject(ProposalService);

  public createWebsocketOrRedirect(login: string): void {
    if (login) {
      this.websocketService.createWebsocket(login);
    } else {
      from(this.router.navigate([routeConstants.LOGIN])).subscribe();
    }
  }

  public enterQueue(login: string): void {
    this.queueService.sendEnterQueue(login);
  }

  public leaveQueue(login: string): void {
    this.queueService.sendLeaveQueue(login);
  }
}
