import { Weight } from 'shared';

/**
 * Represents a cyclic (circular) list structure ordered by item weight.
 *
 * The list maintains a circular traversal where calling {@link next}
 * repeatedly will iterate through all stored items and loop back
 * to the beginning.
 *
 * Inserted items are defined by their weight. Heaviest element are returned
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
 * @typeParam T - The item type stored in the list. Must implement the weight
 * interface
 */
export interface CyclicListStructureInterface<T extends Weight> {
  /**
   * Inserts an item into the cyclic list.
   *
   * The item is placed in the list according to its weight, preserving
   * the internal ordering of elements.
   *
   * @param item - The item to insert.
   */
  insertItem(item: T): void;

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
   * @throws {Error} If the list is empty.
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
