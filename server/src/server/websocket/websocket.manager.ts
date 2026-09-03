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
      case ClientMessageType.CONNECTION: {
        return this.sessionManager.receiveConnection(login);
      }
      case ClientMessageType.QUEUE: {
        return this.sessionManager.receiveJoinQueue(login);
      }
      case ClientMessageType.DEQUEUE: {
        return this.sessionManager.receiveLeaveQueue(login);
      }
      case ClientMessageType.ACCEPT_PROPOSAL: {
        return this.sessionManager.receiveAcceptProposal(login, payload.proposalId);
      }
      case ClientMessageType.DECLINE_PROPOSAL: {
        return this.sessionManager.receiveDeclineProposal(login, payload.proposalId);
      }
      case ClientMessageType.LEAVE_GAME: {
        return this.sessionManager.receiveLeaveGame(login);
      }
      case ClientMessageType.REJOIN_GAME: {
        return this.sessionManager.receiveRejoinGame(login);
      }
      case ClientMessageType.TURN_END: {
        return this.sessionManager.receiveTurnEnd(login);
      }
      case ClientMessageType.POSSIBLE_PATHS: {
        return this.sessionManager.receiveAndSendPossiblePaths(login);
      }
      case ClientMessageType.PATH: {
        return this.sessionManager.receivePathGameEvent(login, payload.path);
      }
      case ClientMessageType.ACTION: {
        return this.sessionManager.receiveAction(login, payload);
      }
    }
  }
}
