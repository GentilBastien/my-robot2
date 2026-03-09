import { deepEquals } from '@utils/equals.utils';

export function arrayIncludes<T>(array: T[], item: T): boolean {
  return array.some(elem => deepEquals(elem, item));
}

export function arrayNotIncludes<T>(array: T[], item: T): boolean {
  return !array.every(elem => deepEquals(elem, item));
}

export function arrayHasDuplicates<T>(array: T[], identificationFn: (item: T) => string): boolean {
  const visited = new Set<string>();
  for (const elem of array) {
    const key: string = identificationFn(elem);
    if (visited.has(key)) {
      return true; //array already has this element
    }
    visited.add(key);
  }
  return false;
}
