import { MaybeArray } from 'shared';

/**
 * Array using indexes to insert elements, always retrieve the first one.
 */
export interface ArrayIndexStructureInterface<T> {
  size(): number;
  consumeFirst(): T | undefined;
  insertStart(element: MaybeArray<T>): void;
  insertEnd(element: MaybeArray<T>): void;
  insertBefore(index: number, element: MaybeArray<T>): void;
  insertAfter(index: number, element: MaybeArray<T>): void;
}
