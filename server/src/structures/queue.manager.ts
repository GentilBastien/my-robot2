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

  public removeAndGet(): string[] | null {
    console.log('queue check', this.logins);
    if (this.logins.size >= 4) {
      const returned = Array.from(this.logins);
      this.removeAll(returned);
      return returned;
    }
    return null;
  }
}
