import WebSocket, { RawData } from 'ws';
import { ClientMessage, MessageType } from 'shared';
import { PlayerManager } from '@server-websocket/i/player-manager';

export interface Player {
  login: string;
  webSocket: WebSocket;
  inQueue?: boolean;
  gameId?: string;
  ping?: number;
  permissions?: number[];
}

export class WebsocketManager {
  private readonly playerRegistry = new PlayerManager();

  public isAlreadyRegistered(login: string): boolean {
    return this.playerRegistry.isAlreadyRegistered(login);
  }

  public register(login: string, webSocket: WebSocket): void {
    this.playerRegistry.register(login, webSocket);
  }

  public unregister(ws: WebSocket): void {
    this.playerRegistry.unregister(ws);
  }

  public markPlayerInQueue(login: string, flag: boolean): void {
    this.playerRegistry.changePlayerQueueState(login, flag);
  }

  public handleClientMessage(ws: WebSocket, data: RawData) {
    const { login, type, payload }: ClientMessage = JSON.parse(data.toString());
    switch (type) {
      case MessageType.QUEUE:
      case MessageType.DEQUEUE:
      case MessageType.ACCEPT_MATCH:
      case MessageType.DECLINE_MATCH: {
        return;
      }
    }
  }
}
