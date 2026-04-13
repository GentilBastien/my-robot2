import { QueueStructure } from '@structures/queue/queue.structure';
import { basicRanker } from '@server/queue/basic-ranker';
import { basicMatcher } from '@server/queue/basic-matcher';

export class QueueManager {
  private readonly queue: QueueStructure<string>;

  constructor() {
    this.queue = new QueueStructure(basicRanker, basicMatcher);
  }

  public add(login: string): void {
    this.queue.add(login);
  }

  public remove(login: string): void {
    this.queue.remove(login);
  }

  public removeAll(logins: string[]): void {
    this.queue.removeAll(logins);
  }

  public removeAllMatchedAndGet(): string[] | null {
    return this.queue.popMatched();
  }
}
