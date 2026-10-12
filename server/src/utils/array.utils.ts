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
