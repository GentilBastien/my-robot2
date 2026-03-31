import { QueueStructureInterface } from '@structures/queue/queue.structure-interface';

export type ElementRank<T> = (element: T) => number;
export type ElementMatch<T> = (elements: T[]) => T[] | null;

export class QueueStructure<T> implements QueueStructureInterface<T> {
  private readonly elementRank: ElementRank<T>;
  private readonly elementMatch: ElementMatch<T>;
  private readonly elementsByRank = new Map<number, Set<T>>();

  constructor(elementRank: ElementRank<T>, elementMatch: ElementMatch<T>) {
    this.elementRank = elementRank;
    this.elementMatch = elementMatch;
  }

  public add(element: T): void {
    const rank = this.elementRank(element);
    const set = this.elementsByRank.get(rank) ?? new Set<T>();
    set.add(element);
    this.elementsByRank.set(rank, set);
  }

  public remove(element: T): void {
    const rank = this.elementRank(element);
    const set = this.elementsByRank.get(rank);
    if (!set) return;
    set.delete(element);
    if (set.size === 0) {
      this.elementsByRank.delete(rank);
    }
  }

  public addAll(elements: T[]): void {
    elements.forEach(e => this.add(e));
  }

  public removeAll(elements: T[]): void {
    elements.forEach(e => this.remove(e));
  }

  public contains(element: T): boolean {
    const rank = this.elementRank(element);
    return this.elementsByRank.get(rank)?.has(element) ?? false;
  }

  public removeAllAndGet(): T[] | null {
    for (const set of this.elementsByRank.values()) {
      const matched: T[] | null = this.elementMatch([...set]);
      if (matched) {
        matched.forEach(e => set.delete(e));
        this.removeAll(matched);
        return matched;
      }
    }
    return null;
  }
}
