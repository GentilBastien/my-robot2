import { PriorityListStructureInterface } from './priority-list.structure-interface';
import { Comparator } from 'shared';

export class PriorityListStructure<T> implements PriorityListStructureInterface<T> {
  private readonly _comparator: Comparator<T>;
  private readonly _elems: T[];

  constructor(comparator: Comparator<T>) {
    this._comparator = comparator;
    this._elems = [];
  }

  public get elements(): T[] {
    return this._elems;
  }

  public get comparator(): Comparator<T> {
    return this._comparator;
  }

  public add(elem: T): void {
    for (let i = 0; i < this._elems.length; i++) {
      if (this._comparator.compare(elem, this._elems[i]) > 0) {
        this._elems.splice(i, 0, elem);
        return;
      }
    }
    this._elems.push(elem);
  }

  // public add(elem: T): void {
  //   let low = 0;
  //   let high = this._elems.length;
  //   while (low < high) {
  //     const mid = (low + high) >> 1;
  //     if (this._comparator.compare(elem, this._elems[mid]) > 0) {
  //       high = mid;
  //     } else {
  //       low = mid + 1;
  //     }
  //   }
  //   this._elems.splice(low, 0, elem);
  // }

  public addAll(elems: T[]): void {
    this._elems.push(...elems);
    this._elems.sort((a, b) => this._comparator.compare(b, a));
  }

  public poll(): T | undefined {
    return this._elems.shift();
  }

  public includes(elem: T): boolean {
    return this._elems.includes(elem);
  }
}
