import { Player } from '@server-websocket/websocket.manager';
import WebSocket from 'ws';
import { GameManager } from '../../../game/game.manager';

export class PlayerManager {
  private readonly players = new Map<string, Player>();
  private readonly gamesManager = new GameManager();
  private playersInQueue = 0;

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

  public changePlayerQueueState(login: string, flag: boolean): void {
    const player: Player | undefined = this.players.get(login);
    if (player) {
      player.inQueue = flag;
      this.playersInQueue = this.playersInQueue + (flag ? 1 : -1);
    }
  }

  public makeAProc() {
    if (this.playersInQueue >= 4) {
    }
  }
}
