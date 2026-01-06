export type Comparator<T> = {
  compare(item1: T, item2: T): number;
};
