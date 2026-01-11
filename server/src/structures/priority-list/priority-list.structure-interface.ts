import { Comparator } from 'shared';

/**
 * A priority list sort its elements in increasing order according to a given {@link Comparator}.
 */
export interface PriorityListStructureInterface<T> {
  /**
   * The elements in the list.
   */
  elements: T[];

  /**
   * The comparator used.
   */
  comparator: Comparator<T>;

  /**
   * Adds an element in the list preserving its order.
   * @param elem The element to add.
   */
  add(elem: T): void;

  /**
   * Adds all given elements in the list, preserving its order.
   * @param elems The elements to add.
   */
  addAll(elems: T[]): void;

  /**
   * Removes and returns the first element (lowest cost element according to
   * the internal sort)
   */
  poll(): T | undefined;

  /**
   * Returns true if the given element is included in the array. Test the reference.
   * @param elem Given element.
   */
  includes(elem: T): boolean;

  /**
   * Remove the given element from the array. Works with reference because element is found
   * with indexOf before being removed from array.
   * @param elem Given element.
   */
  remove(elem: T): void;
}
