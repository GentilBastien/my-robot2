import { describe, expect, test } from 'vitest';
import { ElementMatcher, ElementRanker } from '@structures/queue/queue.structure-type';
import { QueueStructure } from '@structures/queue/queue.structure';

describe('QueueStructure', () => {
  const elementRank: ElementRanker<string> = e => e.length;
  const elementMatch: ElementMatcher<string> = elems => (elems.length >= 2 ? [elems[0], elems[1]] : null);

  test('QueueStructure add', () => {
    //given
    const queue = new QueueStructure(elementRank, elementMatch);
    //when
    queue.add('bastien'); //rank 7
    queue.add('jade'); //rank 4
    queue.add('raph'); //rank 4
    queue.add('wass'); //rank 4
    //then
    expect(queue.getAllElements()).toStrictEqual(['bastien', 'jade', 'raph', 'wass']);
  });

  test('QueueStructure addAll', () => {
    //given
    const queue = new QueueStructure(elementRank, elementMatch);
    //when
    queue.addAll(['bastien', 'jade', 'raph', 'wass']);
    //then
    expect(queue.getAllElements()).toStrictEqual(['bastien', 'jade', 'raph', 'wass']);
  });

  test('QueueStructure remove #1', () => {
    //given
    const queue = new QueueStructure(elementRank, elementMatch);
    queue.addAll(['bastien', 'jade', 'raph', 'wass']);
    //when
    queue.remove('bastien');
    //then
    expect(queue.getAllElements()).toStrictEqual(['jade', 'raph', 'wass']);
  });

  test('QueueStructure remove #2', () => {
    //given
    const queue = new QueueStructure(elementRank, elementMatch);
    queue.addAll(['bastien', 'jade', 'raph', 'wass']);
    //when
    queue.remove('jade');
    //then
    expect(queue.getAllElements()).toStrictEqual(['bastien', 'raph', 'wass']);
  });

  test('QueueStructure removeAll #1', () => {
    //given
    const queue = new QueueStructure(elementRank, elementMatch);
    queue.addAll(['bastien', 'jade', 'raph', 'wass']);
    //when
    queue.removeAll(['jade', 'a']);
    //then
    expect(queue.getAllElements()).toStrictEqual(['bastien', 'raph', 'wass']);
  });

  test('QueueStructure removeAll #1', () => {
    //given
    const queue = new QueueStructure(elementRank, elementMatch);
    queue.addAll(['bastien', 'jade', 'raph', 'wass']);
    //when
    queue.removeAll(['jade', 'bastien', 'a']);
    //then
    expect(queue.getAllElements()).toStrictEqual(['raph', 'wass']);
  });

  test('QueueStructure popMatched #1', () => {
    //given
    const queue = new QueueStructure(elementRank, elementMatch);
    queue.addAll(['bastien', 'jade', 'clement', 'raph', 'wass']);
    expect(queue.popMatched()).toStrictEqual(['bastien', 'clement']);
    expect(queue.popMatched()).toStrictEqual(['jade', 'raph']);
    expect(queue.getAllElements()).toStrictEqual(['wass']);
  });

  test('QueueStructure setElementRanker #1', () => {
    //given
    const queue = new QueueStructure(elementRank, elementMatch);
    const newElemRanker: ElementRanker<string> = element => element.charCodeAt(0);
    queue.addAll(['raph', 'zoe', 'clement', 'rentier', 'chloe', 'wass', 'robert', 'zabagliones']);
    //when
    expect(queue.popMatched()).toStrictEqual(['raph', 'wass']);
    queue.setElementRanker(newElemRanker);
    //then
    expect(queue.popMatched()).toStrictEqual(['zoe', 'zabagliones']);
    expect(queue.popMatched()).toStrictEqual(['clement', 'chloe']);
    expect(queue.getAllElements()).toStrictEqual(['rentier', 'robert']);
    expect(queue.popMatched()).toStrictEqual(['rentier', 'robert']);
    expect(queue.getAllElements()).toStrictEqual([]);
  });
});
