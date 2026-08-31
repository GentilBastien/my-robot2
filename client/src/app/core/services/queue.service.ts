import { inject, Injectable, signal } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { ClientMessageType } from 'shared';

@Injectable({ providedIn: 'root' })
export class QueueService {
  private readonly websocketService = inject(WebsocketService);

  public readonly inQueue = signal<boolean>(false);

  public sendEnterQueue(login: string): void {
    this.inQueue.set(true);
    this.websocketService.sendToServer(login, ClientMessageType.QUEUE);
  }

  public sendLeaveQueue(login: string): void {
    this.inQueue.set(false);
    this.websocketService.sendToServer(login, ClientMessageType.DEQUEUE);
  }
}
