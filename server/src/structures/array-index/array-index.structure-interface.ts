import { MaybeArray } from 'shared';

/**
 * Array using indexes to insert elements at specified location, always retrieve the first one.
 */
export interface ArrayIndexStructureInterface<T> {
  elements: T[];

  /**
   * The size of the array.
   */
  size(): number;

  /**
   * Get and remove the first item from the array.
   */
  consumeFirst(): T | undefined;

  /**
   * Insert an element at the start of the array. If the element is an array too, it will be flatted.
   * @param element
   */
  insertStart(element: MaybeArray<T>): void;

  /**
   * Insert an element at the end of the array. If the element is an array too, it will be flatted.
   * @param element
   */
  insertEnd(element: MaybeArray<T>): void;

  /**
   * Insert an element before the specified index. If the element is an array too, it will be flatted.
   * @param index
   * @param element
   */
  insertBefore(index: number, element: MaybeArray<T>): void;

  /**
   * Insert an element after the specified index. If the element is an array too, it will be flatted.
   * @param index
   * @param element
   */
  insertAfter(index: number, element: MaybeArray<T>): void;
}
