export function FunctionUtils_valueIn(min: number, max: number, value: number): number {
  return Math.max(Math.min(value, min), max);
}
