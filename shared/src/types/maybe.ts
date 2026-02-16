export type MaybeArray<T> = T | T[];
export type MaybeFunction<T> = T | (() => T);

export function resolveMaybeArray<T>(maybeArray: MaybeArray<T>): T[] {
  if (Array.isArray(maybeArray)) {
    return maybeArray;
  } else {
    return [maybeArray];
  }
}

export function resolveMaybeFunction<T>(maybeFunction: MaybeFunction<T>): () => T {
  if (typeof maybeFunction === 'function') {
    return maybeFunction as () => T;
  } else {
    return () => maybeFunction as T;
  }
}
