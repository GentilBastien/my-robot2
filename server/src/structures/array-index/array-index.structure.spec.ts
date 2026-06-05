import { describe, expect, test } from 'vitest';
import { ArrayIndexStructure } from '@structures/array-index/array-index.structure';

describe('ArrayIndex', () => {
  test('ArrayIndex size', () => {
    //given
    const initialArray = ['a', 'b', 'c', 'd', 'e', 'f'];
    const arrayIndex = new ArrayIndexStructure(initialArray);
    //when
    expect(arrayIndex.size()).toBe(6);
    arrayIndex.insertStart('a');
    expect(arrayIndex.size()).toBe(7);
    arrayIndex.insertStart('a');
    expect(arrayIndex.size()).toBe(8);
  });

  test('ArrayIndex consumeFirst', () => {
    //given
    const initialArray = ['a', 'b', 'c', 'd', 'e', 'f'];
    const arrayIndex = new ArrayIndexStructure(initialArray);
    //when
    expect(arrayIndex.consumeFirst()).toBe('a');
    expect(arrayIndex.consumeFirst()).toBe('b');
    expect(arrayIndex.consumeFirst()).toBe('c');
    expect(arrayIndex.consumeFirst()).toBe('d');
    expect(arrayIndex.consumeFirst()).toBe('e');
    expect(arrayIndex.consumeFirst()).toBe('f');
  });

  test('ArrayIndex insertStart single element', () => {
    //given
    const initialArray = ['a', 'b', 'c', 'd', 'e', 'f'];
    const arrayIndex = new ArrayIndexStructure(initialArray);
    //when
    arrayIndex.insertStart('h');
    //then
    expect(arrayIndex.elements).toStrictEqual(['h', 'a', 'b', 'c', 'd', 'e', 'f']);
  });

  test('ArrayIndex insertStart array element', () => {
    //given
    const initialArray = ['a', 'b', 'c', 'd', 'e', 'f'];
    const arrayIndex = new ArrayIndexStructure(initialArray);
    //when
    arrayIndex.insertStart(['i', 'j']);
    //then
    expect(arrayIndex.elements).toStrictEqual(['i', 'j', 'a', 'b', 'c', 'd', 'e', 'f']);
  });

  test('ArrayIndex insertEnd single element', () => {
    //given
    const initialArray = ['a', 'b', 'c', 'd', 'e', 'f'];
    const arrayIndex = new ArrayIndexStructure(initialArray);
    //when
    arrayIndex.insertEnd('h');
    //then
    expect(arrayIndex.elements).toStrictEqual(['a', 'b', 'c', 'd', 'e', 'f', 'h']);
  });

  test('ArrayIndex insertEnd array element', () => {
    //given
    const initialArray = ['a', 'b', 'c', 'd', 'e', 'f'];
    const arrayIndex = new ArrayIndexStructure(initialArray);
    //when
    arrayIndex.insertEnd(['i', 'j']);
    //then
    expect(arrayIndex.elements).toStrictEqual(['a', 'b', 'c', 'd', 'e', 'f', 'i', 'j']);
  });

  test('ArrayIndex insertBefore single element', () => {
    //given
    const initialArray = ['a', 'b', 'c', 'd', 'e', 'f'];
    const arrayIndex = new ArrayIndexStructure(initialArray);
    //when
    arrayIndex.insertBefore(2, 'h');
    //then
    expect(arrayIndex.elements).toStrictEqual(['a', 'b', 'h', 'c', 'd', 'e', 'f']);
  });

  test('ArrayIndex insertBefore array element', () => {
    //given
    const initialArray = ['a', 'b', 'c', 'd', 'e', 'f'];
    const arrayIndex = new ArrayIndexStructure(initialArray);
    //when
    arrayIndex.insertBefore(2, ['i', 'j']);
    //then
    expect(arrayIndex.elements).toStrictEqual(['a', 'b', 'i', 'j', 'c', 'd', 'e', 'f']);
  });

  test('ArrayIndex insertAfter single element', () => {
    //given
    const initialArray = ['a', 'b', 'c', 'd', 'e', 'f'];
    const arrayIndex = new ArrayIndexStructure(initialArray);
    //when
    arrayIndex.insertAfter(2, 'h');
    //then
    expect(arrayIndex.elements).toStrictEqual(['a', 'b', 'c', 'h', 'd', 'e', 'f']);
  });

  test('ArrayIndex insertAfter array element', () => {
    //given
    const initialArray = ['a', 'b', 'c', 'd', 'e', 'f'];
    const arrayIndex = new ArrayIndexStructure(initialArray);
    //when
    arrayIndex.insertAfter(2, ['i', 'j']);
    //then
    expect(arrayIndex.elements).toStrictEqual(['a', 'b', 'c', 'i', 'j', 'd', 'e', 'f']);
  });
});
