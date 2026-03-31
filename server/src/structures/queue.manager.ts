import { ElementMatch, ElementRank, QueueStructure } from '@structures/queue/queue.structure';

export class QueueManager {
  private readonly elementRank: ElementRank<string> = () => 1;
  private readonly elementMatch: ElementMatch<string> = elems => {
    if (elems.length > 0) {
      console.log('queue check', elems);
    }
    if (elems.length >= 2) {
      const [first, second, ...rest] = elems;
      return [first, second];
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

  public removeAndGet(): string[] | null {
    return this.queue.removeAllAndGet();
  }
}
