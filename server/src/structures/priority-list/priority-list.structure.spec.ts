import { describe, expect, test } from 'vitest';
import { PriorityListStructure } from './priority-list.structure';
import { Comparator } from 'shared';

describe('SortedListStructure', () => {
  const comparator: Comparator<string> = {
    compare(item1: string, item2: string): number {
      return item1.localeCompare(item2);
    },
  };

  test('SortedListStructure addAll #1', () => {
    //given
    const sortedList = new PriorityListStructure(comparator);
    //when
    sortedList.addAll(['a', 'd', 'c', 'b']);
    //then
    expect(sortedList.elements).toStrictEqual(['d', 'c', 'b', 'a']);
  });

  test('SortedListStructure addAll #2', () => {
    //given
    const sortedList = new PriorityListStructure(comparator);
    //when
    sortedList.addAll(['b', 'c', 'd', 'a']);
    //then
    expect(sortedList.elements).toStrictEqual(['d', 'c', 'b', 'a']);
  });

  test('SortedListStructure addAll #3', () => {
    //given
    const sortedList = new PriorityListStructure(comparator);
    //when
    sortedList.addAll(['a', 'b', 'c', 'd']);
    //then
    expect(sortedList.elements).toStrictEqual(['d', 'c', 'b', 'a']);
  });

  test('SortedListStructure addAll #3', () => {
    //given
    const sortedList = new PriorityListStructure(comparator);
    //when
    sortedList.addAll(['a', 'b', 'c', 'd']);
    //then
    expect(sortedList.elements).toStrictEqual(['d', 'c', 'b', 'a']);
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
    expect(sortedList.elements).toStrictEqual(['d', 'c', 'b', 'a']);
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
    expect(sortedList.elements).toStrictEqual(['d', 'c', 'a', 'a']);
  });

  test('SortedListStructure add #3', () => {
    //given
    const sortedList = new PriorityListStructure(comparator);
    //when
    sortedList.add('b');
    sortedList.add('a');
    //then
    expect(sortedList.elements).toStrictEqual(['b', 'a']);
  });
});
