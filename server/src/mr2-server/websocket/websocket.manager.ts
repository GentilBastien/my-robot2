import WebSocket, { RawData } from 'ws';

export interface PlayerSession {
  login: string;
  webSocket: WebSocket;
  sessionId?: string;
  gameId?: string;
  ping?: number;
  permissions?: number[];
}

export class WebsocketManager {
  private readonly players = new Map<string, PlayerSession>();

  public isAlreadyRegistered(login: string): boolean {
    return this.players.has(login);
  }

  public register(login: string, webSocket: WebSocket): void {
    this.players.set(login, { login, webSocket });
  }

  public unregister(ws: WebSocket): void {
    for (const client of this.players.values()) {
      if (client.webSocket === ws) {
        this.players.delete(client.login);
      }
    }
    throw 'Client not found';
  }

  public handleClientMessage(ws: WebSocket, data: RawData) {
    console.log(JSON.parse(data.toString()));
  }
}
