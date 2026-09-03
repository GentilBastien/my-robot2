import { computed, inject, Injectable, signal } from '@angular/core';
import { WebsocketService } from '@core/services/websocket.service';
import { ClientMessageType } from 'shared';

@Injectable({ providedIn: 'root' })
export class GameService {
  private readonly websocketService = inject(WebsocketService);

  public readonly gameId = signal<string | undefined>(undefined);
  public readonly hasGame = computed<boolean>(() => this.gameId() !== undefined);

  public definesGame(gameId: string | undefined): void {
    this.gameId.set(gameId);
  }

  public sendLeaveGame(login: string): void {
    this.websocketService.sendToServer(login, ClientMessageType.LEAVE_GAME);
  }

  public sendRejoinGame(login: string): void {
    this.websocketService.sendToServer(login, ClientMessageType.REJOIN_GAME);
  }
}
