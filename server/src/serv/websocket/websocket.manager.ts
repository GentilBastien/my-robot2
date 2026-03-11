import { RawData, WebSocket } from 'ws';
import { ClientMessage, MessageType, ServerResponse } from 'shared';
import { handleLogin } from './websocket-case/login.websocket-case';

export interface Client {
  login: string;
  ws: WebSocket;
  sessionId?: string;
  gameId?: string;
  ping?: number;
  permissions?: number[];
}

export class WebsocketManager {
  private clientsByLogin = new Map<string, Client>();

  public isAlreadyRegistered(login: string): boolean {
    return this.clientsByLogin.has(login);
  }

  public register(login: string, client: Client): void {
    this.clientsByLogin.set(login, client);
  }

  public unregister(ws: WebSocket): void {
    for (const client of this.clientsByLogin.values()) {
      if (client.ws === ws) {
        this.clientsByLogin.delete(client.login);
      }
    }
    throw 'Client not found';
  }

  public handleClientMessage(ws: WebSocket, data: RawData) {
    const parsedData: ClientMessage = JSON.parse(data.toString());
    const { login, type, payload } = parsedData;
    switch (type) {
      case MessageType.LOGIN: {
        handleLogin(this, ws, login, payload);
        break;
      }
      default:
        throw 'Unknown type';
    }
    return login;
  }

  public sendTo(serverMessage: ServerResponse): void {
    const client: Client | undefined = this.clientsByLogin.get(serverMessage.login);
    if (!client || client.ws.readyState !== WebSocket.OPEN) {
      throw 'Client not found or not ready';
    }
    const jsonMessage = JSON.stringify(serverMessage);
    client.ws.send(jsonMessage);
  }
}
