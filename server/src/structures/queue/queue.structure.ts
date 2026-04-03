import { QueueStructureInterface } from '@structures/queue/queue.structure-interface';
import { ElementMatcher, ElementRanker } from '@structures/queue/queue.structure-type';

export class QueueStructure<T> implements QueueStructureInterface<T> {
  private _elementRanker: ElementRanker<T>;
  private _elementMatcher: ElementMatcher<T>;
  private readonly byRank: Map<number, Set<T>>;
  private readonly all: Set<T>;

  constructor(elementRanker: ElementRanker<T>, elementMatcher: ElementMatcher<T>) {
    this._elementRanker = elementRanker;
    this._elementMatcher = elementMatcher;
    this.byRank = new Map<number, Set<T>>();
    this.all = new Set<T>();
  }

  public setElementRanker(elementRanker: ElementRanker<T>): void {
    this._elementRanker = elementRanker;
    this.byRank.clear();
    this.all.forEach(element => this.add(element));
  }

  public setElementMatcher(elementMatcher: ElementMatcher<T>): void {
    this._elementMatcher = elementMatcher;
  }

  public getAllElements(): T[] {
    return [...this.all];
  }

  public add(element: T): void {
    const rank = this._elementRanker(element);
    const set = this.byRank.get(rank) ?? new Set<T>();
    set.add(element);
    this.byRank.set(rank, set);
    this.all.add(element);
  }

  public remove(element: T): void {
    const rank = this._elementRanker(element);
    const set = this.byRank.get(rank);
    if (!set) return;

    set.delete(element);
    this.all.delete(element);

    if (set.size === 0) {
      this.byRank.delete(rank);
    }
  }

  public addAll(elements: T[]): void {
    elements.forEach(element => this.add(element));
  }

  public removeAll(elements: T[]): void {
    elements.forEach(element => this.remove(element));
  }

  public contains(element: T): boolean {
    return this.all.has(element);
  }

  public popMatched(): T[] | null {
    for (const set of this.byRank.values()) {
      const matched: T[] | null = this._elementMatcher([...set]);
      if (matched) {
        this.removeAll(matched);
        return matched;
      }
    }
    return null;
  }
}
