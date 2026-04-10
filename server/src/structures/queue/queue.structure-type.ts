/**
 * Knowing the given element, return its rank.
 */
export type ElementRanker<T> = (element: T) => number;

/**
 * Knowing all the given elements, matchup some or all of them together.
 */
export type ElementMatcher<T> = (elements: T[]) => T[] | null;
