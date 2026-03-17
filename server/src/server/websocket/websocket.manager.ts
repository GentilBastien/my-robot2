import WebSocket, { RawData } from 'ws';
import { MessageType, SessionStateTypeEnum } from 'shared';
import { SessionManager } from '@server/session/session.manager';

export interface Session {
  login: string;
  webSocket: WebSocket;
  state: SessionStateTypeEnum;
  proposalId?: string;
  gameId?: string;
  ping?: number;
  permissions?: number[];
}

export class WebsocketManager {
  private readonly sessionManager = new SessionManager();

  public isAlreadyRegistered(login: string): boolean {
    return this.sessionManager.isAlreadyRegistered(login);
  }

  public register(login: string, webSocket: WebSocket): void {
    this.sessionManager.register(login, webSocket);
  }

  public unregister(ws: WebSocket): void {
    this.sessionManager.unregister(ws);
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
