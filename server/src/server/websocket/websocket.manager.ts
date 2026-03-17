import WebSocket, { RawData } from 'ws';
import { MessageType, SessionStateTypeEnum } from 'shared';
import { SessionManager } from '@server/session/session.manager';

export interface Session {
  login: string;
  webSocket: WebSocket;
  state: SessionStateTypeEnum;
  proposalId?: boolean;
  gameId?: string;
  ping?: number;
  permissions?: number[];
}

export class WebsocketManager {
  private readonly playerRegistry = new SessionManager();

  public isAlreadyRegistered(login: string): boolean {
    return this.playerRegistry.isAlreadyRegistered(login);
  }

  public register(login: string, webSocket: WebSocket): void {
    this.playerRegistry.register(login, webSocket);
  }

  public unregister(ws: WebSocket): void {
    this.playerRegistry.unregister(ws);
  }

  public handleClientMessage(ws: WebSocket, data: RawData) {
    const { login, type, payload } = JSON.parse(data.toString());
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
