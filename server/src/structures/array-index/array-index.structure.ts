import { MaybeArray } from 'shared';
import { ArrayIndexStructureInterface } from '@structures/array-index/array-index.structure-interface';
import { resolveMaybeArray } from 'shared/dist/types/maybe';

export class ArrayIndexStructure<T> implements ArrayIndexStructureInterface<T> {
  private elements: T[];

  constructor(elements?: T[]) {
    this.elements = elements ?? [];
  }

  public size(): number {
    return this.elements.length;
  }

  public consumeFirst(): T | undefined {
    return this.elements.shift();
  }

  public insertStart(element: MaybeArray<T>): void {
    const elements: T[] = resolveMaybeArray(element);
    this.elements.unshift(...elements);
  }

  public insertEnd(element: MaybeArray<T>): void {
    const elements: T[] = resolveMaybeArray(element);
    this.elements.push(...elements);
  }

  public insertBefore(index: number, element: MaybeArray<T>): void {
    const elements: T[] = resolveMaybeArray(element);
    this.elements.splice(index - 1, 0, ...elements);
  }

  public insertAfter(index: number, element: MaybeArray<T>): void {
    const elements: T[] = resolveMaybeArray(element);
    this.elements.splice(index, 0, ...elements);
  }
}
