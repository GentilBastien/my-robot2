import { describe, expect, test } from 'vitest';
import { PriorityListStructure } from './priority-list.structure';
import { Comparator } from 'shared';

describe('SortedListStructure', () => {
  type ARandomObject = {
    a: number;
    b: string;
  };
  const comparator: Comparator<string> = {
    compare(item1: string, item2: string): number {
      return item1.localeCompare(item2);
    },
  };
  const objectComparator: Comparator<ARandomObject> = {
    compare(item1: ARandomObject, item2: ARandomObject): number {
      return item1.a - item2.a;
    },
  };

  test('SortedListStructure addAll #1', () => {
    //given
    const sortedList = new PriorityListStructure(comparator);
    //when
    sortedList.addAll(['a', 'd', 'c', 'b']);
    //then
    expect(sortedList.elements).toStrictEqual(['a', 'b', 'c', 'd']);
  });

  test('SortedListStructure addAll #2', () => {
    //given
    const sortedList = new PriorityListStructure(comparator);
    //when
    sortedList.addAll(['b', 'c', 'd', 'a']);
    //then
    expect(sortedList.elements).toStrictEqual(['a', 'b', 'c', 'd']);
  });

  test('SortedListStructure addAll #3', () => {
    //given
    const sortedList = new PriorityListStructure(comparator);
    //when
    sortedList.addAll(['a', 'b', 'c', 'd']);
    //then
    expect(sortedList.elements).toStrictEqual(['a', 'b', 'c', 'd']);
  });

  test('SortedListStructure addAll #3', () => {
    //given
    const sortedList = new PriorityListStructure(comparator);
    //when
    sortedList.addAll(['a', 'b', 'c', 'd']);
    //then
    expect(sortedList.elements).toStrictEqual(['a', 'b', 'c', 'd']);
  });

  test('SortedListStructure add #1', () => {
    //given
    const sortedList = new PriorityListStructure(comparator);
    //when
    sortedList.add('a');
    sortedList.add('c');
    sortedList.add('b');
    sortedList.add('d');
    //then
    expect(sortedList.elements).toStrictEqual(['a', 'b', 'c', 'd']);
  });

  test('SortedListStructure add #2', () => {
    //given
    const sortedList = new PriorityListStructure(comparator);
    //when
    sortedList.add('a');
    sortedList.add('a');
    sortedList.add('d');
    sortedList.add('c');
    //then
    expect(sortedList.elements).toStrictEqual(['a', 'a', 'c', 'd']);
  });

  test('SortedListStructure add #3', () => {
    //given
    const sortedList = new PriorityListStructure(comparator);
    //when
    sortedList.add('b');
    sortedList.add('a');
    //then
    expect(sortedList.elements).toStrictEqual(['a', 'b']);
  });

  test('SortedListStructure includes #1', () => {
    //given
    const sortedList = new PriorityListStructure(comparator);
    sortedList.addAll(['z', 'a', 'b', 't']);
    //when
    const result = sortedList.includes('b');
    //then
    expect(result).toBe(true);
  });

  test('SortedListStructure includes #2', () => {
    //given
    const sortedList = new PriorityListStructure(comparator);
    sortedList.addAll(['z', 'a', 'b', 't']);
    //when
    const result = sortedList.includes('g');
    //then
    expect(result).toBe(false);
  });

  test('SortedListStructure includes #3', () => {
    //given
    const sortedList = new PriorityListStructure(objectComparator);
    const includedElement = { a: 7, b: 'aze' };
    sortedList.addAll([{ a: 1, b: 'name' }, includedElement]);
    //when
    const result = sortedList.includes(includedElement);
    //then
    expect(result).toBe(true);
  });

  test('SortedListStructure remove #1', () => {
    //given
    const sortedList = new PriorityListStructure(objectComparator);
    const elementToRemove = { a: 7, b: 'aze' };
    sortedList.addAll([{ a: 1, b: 'name' }, elementToRemove]);
    //when
    sortedList.remove(elementToRemove);
    //then
    expect(sortedList.elements).toStrictEqual([{ a: 1, b: 'name' }]);
  });

  test('SortedListStructure remove #2', () => {
    //given
    const sortedList = new PriorityListStructure(objectComparator);
    sortedList.addAll([
      { a: 1, b: 'name' },
      { a: 7, b: 'aze' },
    ]);
    //when
    sortedList.remove({ a: 7, b: 'aze' });
    //then
    expect(sortedList.elements).toStrictEqual([
      { a: 1, b: 'name' },
      { a: 7, b: 'aze' },
    ]);
  });
});
