import { Session } from '@server-websocket/websocket.manager';
import WebSocket from 'ws';
import { SessionStateTypeEnum } from 'shared';
import { GameProposal } from '@proposal/game-proposal';

export class SessionManager {
  private readonly sessions: Record<string, Session> = {};

  public register(login: string, webSocket: WebSocket): void {
    this.sessions[login] = { login, webSocket, state: SessionStateTypeEnum.ONLINE };
  }

  public unregister(ws: WebSocket): void {
    for (const key in this.sessions) {
      if (this.sessions[key].webSocket === ws) {
        delete this.sessions[key];
        return;
      }
    }
    throw 'Client not found';
  }

  public getSession(login: string): Session {
    return this.sessions[login];
  }

  public isAlreadyRegistered(login: string): boolean {
    return this.sessions[login] !== undefined;
  }

  public sendGameProposal(gameProposal: GameProposal): void {
    //todo
  }
}
