import WebSocket, { RawData } from 'ws';
import { ClientMessageType } from 'shared';
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

  public handleClientMessage(ws: WebSocket, data: RawData): void {
    const { login, type, payload } = JSON.parse(data.toString());
    console.log('login:', login, 'type:', type, 'payload', payload);
    switch (type) {
      case ClientMessageType.QUEUE: {
        this.sessionManager.receiveJoinQueue(login);
        break;
      }
      case ClientMessageType.DEQUEUE: {
        this.sessionManager.receiveLeaveQueue(login);
        break;
      }
      case ClientMessageType.ACCEPT_PROPOSAL: {
        this.sessionManager.receiveAcceptProposal(login, payload.proposalId);
        break;
      }
      case ClientMessageType.DECLINE_PROPOSAL: {
        this.sessionManager.receiveDeclineProposal(login, payload.proposalId);
        break;
      }
      case ClientMessageType.LEAVE_GAME: {
        this.sessionManager.receiveLeaveGame(login);
        break;
      }
      case ClientMessageType.REJOIN_GAME: {
        this.sessionManager.receiveRejoinGame(login);
        break;
      }
      case ClientMessageType.TURN_END: {
        this.sessionManager.receiveTurnEnd(login);
        break;
      }
    }
  }
}
