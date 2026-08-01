import { MaybeArray, resolveMaybeArray } from 'shared';
import { ArrayIndexStructureInterface } from '@structures/array-index/array-index.structure-interface';

export class ArrayIndexStructure<T> implements ArrayIndexStructureInterface<T> {
  private readonly _elements: T[];

  constructor(elements?: T[]) {
    this._elements = elements ?? [];
  }

  public get elements(): T[] {
    return this._elements;
  }

  public size(): number {
    return this._elements.length;
  }

  public consumeFirst(): T | undefined {
    return this._elements.shift();
  }

  public insertStart(element: MaybeArray<T>): void {
    const elements: T[] = resolveMaybeArray(element);
    this._elements.unshift(...elements);
  }

  public insertEnd(element: MaybeArray<T>): void {
    const elements: T[] = resolveMaybeArray(element);
    this._elements.push(...elements);
  }

  public insertBefore(index: number, element: MaybeArray<T>): void {
    const elements: T[] = resolveMaybeArray(element);
    this._elements.splice(index, 0, ...elements);
  }

  public insertAfter(index: number, element: MaybeArray<T>): void {
    const elements: T[] = resolveMaybeArray(element);
    this._elements.splice(index + 1, 0, ...elements);
  }
}
