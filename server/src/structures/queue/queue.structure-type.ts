export type ElementRanker<T> = (element: T) => number;
export type ElementMatcher<T> = (elements: T[]) => T[] | null;
