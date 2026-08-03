import { Coordinate } from 'shared';

/**
 * Returns true if both parameters have/share the same value.
 * @param item1 A parameter of type T
 * @param item2 Another parameter of type T
 */
export function deepEquals<T>(item1: T, item2: T): boolean {
  if (item1 === null) return item2 === null;
  else if (item1 === undefined) return item2 === undefined;
  else if (
    typeof item1 === 'string' ||
    typeof item1 === 'boolean' ||
    typeof item1 === 'number' ||
    typeof item1 === 'bigint' ||
    typeof item1 === 'symbol'
  ) {
    return item1 === item2;
  } else if (Array.isArray(item1) && Array.isArray(item2)) {
    return item1.length === item2.length && item1.every((_, index) => deepEquals(item1[index], item2[index]));
  } else {
    //object case
    return Object.entries(item1).every(([key, value]) => deepEquals(item2[key as keyof T], value));
  }
}

export function coordinateEquals(coordinates1: Coordinate, coordinates2: Coordinate): boolean {
  return coordinates1.x === coordinates2.x && coordinates1.y === coordinates2.y && coordinates1.z === coordinates2.z;
}
