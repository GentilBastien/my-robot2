import WebSocket, { RawData } from 'ws';
import { MessageType } from 'shared';
import { SessionManager } from '@server/session/session.manager';

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
    console.log('log data', login, type, payload);
    switch (type) {
      case MessageType.QUEUE: {
        this.sessionManager.receiveJoinQueue(login);
        break;
      }
      case MessageType.DEQUEUE: {
        this.sessionManager.receiveLeaveQueue(login);
        break;
      }
      case MessageType.ACCEPT_MATCH: {
        this.sessionManager.receiveAcceptProposal(login, payload.proposalId);
        break;
      }
      case MessageType.DECLINE_MATCH: {
        this.sessionManager.receiveDeclineProposal(login, payload.proposalId);
        break;
      }
    }
  }
}
