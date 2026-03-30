export interface QueueStructureInterface<T> {
  /**
   * Adds an element to the queue.
   * @param element The element to add.
   */
  add(element: T): void;

  /**
   * Removes an element from the queue.
   * @param element The element to remove.
   */
  remove(element: T): void;

  /**
   * Adds elements to the queue.
   * @param elements The elements to add.
   */
  addAll(elements: T[]): void;

  /**
   * Removes elements from the queue.
   * @param elements The elements to remove.
   */
  removeAll(elements: T[]): void;

  /**
   * Check if the element is contained in the queue.
   * @param element The element to check.
   */
  contains(element: T): boolean;

  /**
   * Removes a portion of the queue if possible and returns it.
   */
  removeAllAndGet(): T[] | null;
}
