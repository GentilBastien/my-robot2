import { QueueStructure } from '@structures/queue/queue.structure';
import { ElementMatcher, ElementRanker } from '@structures/queue/queue.structure-type';

export class QueueManager {
  private readonly elementRank: ElementRanker<string> = () => 1;
  private readonly elementMatch: ElementMatcher<string> = elems => {
    if (elems.length > 0) {
      console.log('queue check', elems);
    }
    if (elems.length >= 2) {
      return [elems[0], elems[1]];
    }
    return null;
  };
  private readonly queue: QueueStructure<string>;

  constructor() {
    this.queue = new QueueStructure(this.elementRank, this.elementMatch);
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
