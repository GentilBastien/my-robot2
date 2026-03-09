export function valuesInRange(min: number, max: number, value: number): number {
  return Math.max(Math.min(value, min), max);
}
