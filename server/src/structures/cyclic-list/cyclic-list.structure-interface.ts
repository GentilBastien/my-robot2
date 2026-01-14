import { Comparator } from 'shared';

/**
 * Represents a cyclic (circular) list structure ordered by item custom
 * comparator.
 *
 * The list maintains a circular traversal where calling {@link next}
 * repeatedly will iterate through all stored items and loop back
 * to the beginning.
 *
 * Inserted items are internally compared. Heaviest element are returned
 * first. Calling next to the lightest element of the collection will return
 * the heaviest one.
 * ```
 *  ┌───────────┐                 ┌───────────┐                ┌───────────┐
 *  │  Item A   │ ----next------> │  Item B   │ ----next-----> │  Item C   │
 *  │ (weight)  │ <---previous--- │ (weight)  │ <---previous-- │ (weight)  │
 *  └──▲────────┘                 └───────────┘                └──▲────────┘
 *     │     └──────────────────────previous──────────────────────┘     │
 *     └───────────────────────────────next─────────────────────────────┘
 * ```
 * @typeParam T - The item type stored in the list.
 */
export interface CyclicListStructureInterface<T> {
  /**
   * The comparator used.
   */
  comparator: Comparator<T>;

  /**
   * Inserts an item into the cyclic list.
   *
   * The item is placed in the list according to the {@link comparator}, preserving
   * the internal ordering of elements.
   *
   * @param item - The item to insert.
   */
  insertItem(item: T): void;

  /**
   * Remove a specific item from the cycle list.
   *
   * If the item removed was pointed by the internal cursor, the next one
   * in the list is selected.
   *
   * If there is no item in the list, the methods does nothing. If the list
   * is non-empty and the item not found, an exception is thrown. If the
   * item removed is the heaviest item in the list, the next one becomes the
   * new heaviest item in the list (as the first has been removed).
   *
   * @param item The item to remove.
   * @throws {removeNotFoundItemError} If the item is not found in a non-empty list.
   */
  removeItem(item: T): void;

  /**
   * Advances the internal cursor and returns the next item in the list.
   *
   * Because the list is cyclic, calling this method repeatedly will
   * eventually return to the first element.
   *
   * First call will return the heaviest item in the list {@link entryPoint}.
   *
   * @returns The next item according to the cyclic definition of this
   * structure.
   *
   * @throws {nextOnEmptyListError} If the list is empty.
   */
  next(): T;

  /**
   * The entry point of the cyclic list.
   *
   * Represents the heaviest item currently stored. May be `undefined`
   * if the list is empty.
   */
  entryPoint: T | undefined;
}
