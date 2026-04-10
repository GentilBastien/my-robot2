import { ElementMatcher, ElementRanker } from '@structures/queue/queue.structure-type';

/**
 * Structure that stores its values by rank. Each rank is a key in a map,
 * and the values are all the elements that are matched in this rank
 * according to the definition of a {@link ElementRanker}.
 *
 * A {@link ElementMatcher} is used to group and match the elements of a
 * same rank.
 */
export interface QueueStructureInterface<T> {
  /**
   * Set the {@link ElementRanker} of this structure. Retroactively change
   * the internal structure.
   * @param elementRanker The new ElementRank.
   */
  setElementRanker(elementRanker: ElementRanker<T>): void;

  /**
   * Set the {@link ElementMatcher} of this structure. Next matching will use
   * this new element matcher.
   * @param elementMatcher The new ElementMatch.
   */
  setElementMatcher(elementMatcher: ElementMatcher<T>): void;

  /**
   * Get all the elements stored in this queue.
   */
  getAllElements(): T[];

  /**
   * Adds an element to the queue according to the {@link ElementRanker}.
   * @param element The element to add.
   */
  add(element: T): void;

  /**
   * Removes an element from the queue. The elements may not exist in the queue.
   * @param element The element to remove.
   */
  remove(element: T): void;

  /**
   * Adds elements to the queue according to the {@link ElementRanker}.
   * @param elements The elements to add.
   */
  addAll(elements: T[]): void;

  /**
   * Removes elements from the queue.
   * @param elements The elements to remove.
   */
  removeAll(elements: T[]): void;

  /**
   * Check if the element is contained in the queue, whatever its rank.
   * @param element The element to check.
   */
  contains(element: T): boolean;

  /**
   * Removes, if possible, a portion of the queue determined
   * by {@link ElementMatcher} and returns it.
   */
  popMatched(): T[] | null;
}
