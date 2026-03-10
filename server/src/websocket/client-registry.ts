import { WebSocket } from 'ws';

export interface Client {
  login: string;
  ws: WebSocket;
  sessionId?: string;
  gameId?: string;
  ping?: number;
  permissions?: number[];
}

export class ClientRegistry {
  private clientsByLogin = new Map<string, Client>();

  public isAlreadyRegistered(login: string): boolean {
    return this.clientsByLogin.has(login);
  }

  public register(login: string, client: Client): void {
    this.clientsByLogin.set(login, client);
  }

  public unregister(login: string): void {
    this.clientsByLogin.delete(login);
  }

  public sendTo(login: string, message: unknown): void {
    const client = this.clientsByLogin.get(login);

    if (!client || client.ws.readyState !== WebSocket.OPEN) {
      return;
    }

    client.ws.send(JSON.stringify(message));
  }
}
