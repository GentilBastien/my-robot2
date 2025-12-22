import { Comparable } from 'shared';

export class CyclicListStructure<T extends Comparable<T>> {
  private readonly _items: T[] = [];
  private _currentPosition = 0;

  constructor(items: T[]) {
    this._items = this.sortDecreasingOrder(items);
  }

  public next(): T {
    if (this.currentPosition === this.items.length) {
      this._currentPosition = 0;
    }
    const item: T = this.items[this.currentPosition];
    this._currentPosition++;
    return item;
  }

  public insertItem(item: T): void {
    //TODO: to test
    for (let i = 0; i < this._items.length; i++) {
      if (item.compareTo(this._items[i]) > 0) {
        this._items.splice(i, 0, item);
        return;
      }
    }
    this._items.push(item);
  }

  private sortDecreasingOrder(items: T[]): T[] {
    return items.sort((item1, item2) => -item1.compareTo(item2));
  }

  public get items(): T[] {
    return this._items;
  }

  public get currentPosition(): number {
    return this._currentPosition;
  }
}
