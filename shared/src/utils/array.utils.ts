import { EqualsUtils } from './equals.utils';

export class ArrayUtils {
  public static arrayIncludes<T>(array: T[], item: T): boolean {
    return array.some(elem => EqualsUtils.deepEquals(elem, item));
  }

  public static arrayNotIncludes<T>(array: T[], item: T): boolean {
    return !array.every(elem => EqualsUtils.deepEquals(elem, item));
  }

  public static arrayHasDuplicates<T>(array: T[], identificationFn: (item: T) => string): boolean {
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
}
