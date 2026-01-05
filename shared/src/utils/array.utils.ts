import { EqualsUtils } from './equals.utils';

export class ArrayUtils {
  public static arrayIncludes<T>(array: T[], item: T): boolean {
    return array.some(elem => EqualsUtils.deepEquals(elem, item));
  }

  public static arrayNotIncludes<T>(array: T[], item: T): boolean {
    return !array.every(elem => EqualsUtils.deepEquals(elem, item));
  }
}
