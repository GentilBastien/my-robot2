import { Session } from '@server-websocket/websocket.manager';

export class QueueManager {
  //TODO, make it a struct
  sessions: Session[] = [];

  public add(session: Session): void {
    this.sessions.push(session);
  }

  public remove(session: Session): void {
    this.sessions = this.sessions.filter(p => p !== session);
  }

  public tryCreateProposal(): string[] | null {
    //TODO: other rules of matchmaking
    //
    return [];
  }
}
