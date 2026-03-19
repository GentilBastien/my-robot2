export class QueueManager {
  private logins: Set<string>;

  constructor() {
    this.logins = new Set();
  }

  public add(login: string): void {
    this.logins.add(login);
  }

  public addAll(logins: string[]): void {
    logins.forEach(login => this.logins.add(login));
  }

  public remove(login: string): void {
    this.logins.delete(login);
  }

  public removeAll(logins: string[]): void {
    logins.forEach(login => this.logins.delete(login));
  }

  public tryCreateProposal(): string[] | null {
    this.removeAll([]);
    //TODO: other rules of matchmaking, the logins that are chosen MUST be removed from the queue in the mean-time like a array.pop()
    if (this.logins.size >= 4) {
      return [];
    }
    return null;
  }
}
