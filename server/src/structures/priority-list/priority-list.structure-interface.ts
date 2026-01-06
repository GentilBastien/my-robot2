import { Comparator } from 'shared';

/**
 * A priority list sort its elements in a decreasing order according to a given {@link Comparator}.
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
   * Add an element in the list preserving its order.
   * @param elem The element to add.
   */
  add(elem: T): void;

  /**
   * Adds all given elements in the list, preserving its order.
   * @param elems The elements to add.
   */
  addAll(elems: T[]): void;

  /**
   * Removes and returns the first element (heaviest element according to
   * the internal sort)
   */
  poll(): T | undefined;
}
