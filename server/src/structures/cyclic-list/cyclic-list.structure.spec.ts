import { describe, expect, test } from 'vitest';
import { CyclicListStructure } from './cyclic-list.structure';
import { Comparator } from 'shared';
import { CyclicListError } from './cyclic-list.error';

interface InitiativeRobot {
  name: string;
  weight: number;
}
const comparator: Comparator<InitiativeRobot> = {
  compare(item1: InitiativeRobot, item2: InitiativeRobot): number {
    return item1.weight - item2.weight;
  },
};
describe('CyclicListStructure', () => {
  const robot1: InitiativeRobot = { name: 'wassim', weight: 2 };
  const robot2: InitiativeRobot = { name: 'raphael', weight: 4 };
  const robot3: InitiativeRobot = { name: 'bast', weight: 8 };
  const robot3bis: InitiativeRobot = { name: 'bast2', weight: 8 };
  const robot4: InitiativeRobot = { name: 'jade', weight: 12 };

  test('CyclicList empty', () => {
    //given
    const cyclicList = new CyclicListStructure<InitiativeRobot>(comparator);
    //then
    expect(cyclicList.entryPoint).toBe(undefined);
  });

  test('CyclicList insert one item in empty list', () => {
    //given
    const cyclicList = new CyclicListStructure<InitiativeRobot>(comparator);
    //when
    cyclicList.insertItem(robot1);
    //then
    expect(cyclicList.entryPoint).toBe(robot1);
  });

  test('CyclicList insert before', () => {
    //given
    const cyclicList = new CyclicListStructure<InitiativeRobot>(comparator);
    //when
    cyclicList.insertItem(robot1);
    cyclicList.insertItem(robot2);
    cyclicList.insertItem(robot3);
    cyclicList.insertItem(robot4);
    //then
    expect(cyclicList.entryPoint).toBe(robot4);
  });

  test('CyclicList insert after', () => {
    //given
    const cyclicList = new CyclicListStructure<InitiativeRobot>(comparator);
    //then
    cyclicList.insertItem(robot3);
    cyclicList.insertItem(robot2);
    cyclicList.insertItem(robot1);
    expect(cyclicList.entryPoint).toBe(robot3);
    cyclicList.insertItem(robot4);
    expect(cyclicList.entryPoint).toBe(robot4);
  });

  test('CyclicList insert same weight', () => {
    //given
    const cyclicList = new CyclicListStructure<InitiativeRobot>(comparator);
    cyclicList.insertItem(robot1);
    cyclicList.insertItem(robot2);
    cyclicList.insertItem(robot3);
    //then
    cyclicList.insertItem(robot3bis);
    expect(cyclicList.entryPoint).toBe(robot3);
  });

  test('CyclicList next cycles correctly over several iterations with a single item', () => {
    //given
    const nIterations = 10;
    const cyclicList = new CyclicListStructure<InitiativeRobot>(comparator);
    cyclicList.insertItem(robot1);
    //then
    for (let i = 0; i < nIterations; i++) {
      expect(cyclicList.next()).toBe(robot1);
    }
  });

  test('CyclicList next cycles correctly over several iterations with two items', () => {
    //given
    const nIterations = 10;
    const cyclicList = new CyclicListStructure<InitiativeRobot>(comparator);
    cyclicList.insertItem(robot1);
    cyclicList.insertItem(robot2);
    //then
    for (let i = 0; i < nIterations; i++) {
      expect(cyclicList.next()).toBe(robot2);
      expect(cyclicList.next()).toBe(robot1);
    }
  });

  test('CyclicList next cycles correctly over several iterations', () => {
    //given
    const nIterations = 10;
    const cyclicList = new CyclicListStructure<InitiativeRobot>(comparator);
    cyclicList.insertItem(robot1);
    cyclicList.insertItem(robot2);
    cyclicList.insertItem(robot3);
    cyclicList.insertItem(robot4);
    //then
    for (let i = 0; i < nIterations; i++) {
      expect(cyclicList.next()).toBe(robot4);
      expect(cyclicList.next()).toBe(robot3);
      expect(cyclicList.next()).toBe(robot2);
      expect(cyclicList.next()).toBe(robot1);
    }
  });

  test('CyclicList next throws an error if no item', () => {
    //given
    const cyclicList = new CyclicListStructure<InitiativeRobot>(comparator);
    //then
    expect(() => cyclicList.next()).toThrow(CyclicListError.nextOnEmptyListErrorMessage);
  });

  test('CyclicList next cycles correctly when inserting elements', () => {
    //given
    const cyclicList = new CyclicListStructure<InitiativeRobot>(comparator);
    cyclicList.insertItem(robot1); // [robot1]
    // [robot1]
    //  ^
    expect(cyclicList.next()).toBe(robot1);
    cyclicList.insertItem(robot2); // [robot2, robot1]
    // [robot2, robot1]
    //  ^
    expect(cyclicList.next()).toBe(robot2);
    cyclicList.insertItem(robot3); // [robot3, robot2, robot1]
    // [robot3, robot2, robot1]
    //                  ^
    expect(cyclicList.next()).toBe(robot1);
    // [robot3, robot2, robot1]
    //  ^
    expect(cyclicList.next()).toBe(robot3);
    // [robot3, robot2, robot1]
    //          ^
    expect(cyclicList.next()).toBe(robot2);
    cyclicList.insertItem(robot4); // [robot4, robot3, robot2, robot1]
    // [robot4, robot3, robot2, robot1]
    //                          ^
    expect(cyclicList.next()).toBe(robot1);
    // [robot4, robot3, robot2, robot1]
    //  ^
    expect(cyclicList.next()).toBe(robot4);
    // [robot4, robot3, robot2, robot1]
    //          ^
    expect(cyclicList.next()).toBe(robot3);
    // [robot4, robot3, robot2, robot1]
    //                  ^
    expect(cyclicList.next()).toBe(robot2);
    // [robot4, robot3, robot2, robot1]
    //                          ^
    expect(cyclicList.next()).toBe(robot1);
  });

  test('CyclicList remove item in empty list does nothing', () => {
    //given
    const cyclicList = new CyclicListStructure<InitiativeRobot>(comparator);
    //when
    expect(() => cyclicList.removeItem(robot4));
  });

  test('CyclicList remove item that does not exist in the list throws error, except if the list is empty', () => {
    //given
    const cyclicList = new CyclicListStructure<InitiativeRobot>(comparator);
    //when
    cyclicList.insertItem(robot1);
    //then
    expect(() => cyclicList.removeItem(robot4)).toThrow(CyclicListError.removeNotFoundItemErrorMessage);
  });

  test('CyclicList remove single item in list makes it empty', () => {
    //given
    const cyclicList = new CyclicListStructure<InitiativeRobot>(comparator);
    cyclicList.insertItem(robot1);
    //when
    expect(cyclicList.next()).toBe(robot1);
    //then
    expect(cyclicList.entryPoint).toBe(robot1);
    cyclicList.removeItem(robot1);
    expect(() => cyclicList.next()).toThrow(CyclicListError.nextOnEmptyListErrorMessage);
    expect(cyclicList.entryPoint).toBe(undefined);
  });

  test('CyclicList remove the current item selected in the cycle queue makes the next one selected', () => {
    //given
    const cyclicList = new CyclicListStructure<InitiativeRobot>(comparator);
    cyclicList.insertItem(robot1);
    cyclicList.insertItem(robot2);
    cyclicList.insertItem(robot3);
    cyclicList.insertItem(robot4); // selected because robot 4 has biggest weight
    //when
    cyclicList.removeItem(robot4);
    //then
    expect(cyclicList.entryPoint).toBe(robot3);
  });

  test('CyclicList remove any item but the one selected in the cycle queue does not change the selection', () => {
    //given
    const cyclicList = new CyclicListStructure<InitiativeRobot>(comparator);
    cyclicList.insertItem(robot1);
    cyclicList.insertItem(robot2);
    cyclicList.insertItem(robot3);
    cyclicList.insertItem(robot4); // selected because robot 4 has biggest weight
    //when
    cyclicList.removeItem(robot3); // remove robot 3
    //then
    expect(cyclicList.entryPoint).toBe(robot4);
  });

  test('CyclicList try all next insert and remove', () => {
    //given
    const cyclicList = new CyclicListStructure<InitiativeRobot>(comparator);
    cyclicList.insertItem(robot1);
    expect(cyclicList.entryPoint).toBe(robot1);
    expect(cyclicList.next()).toBe(robot1);
    expect(cyclicList.next()).toBe(robot1);
    cyclicList.insertItem(robot2);
    expect(cyclicList.entryPoint).toBe(robot2);
    expect(cyclicList.next()).toBe(robot2);
    expect(cyclicList.next()).toBe(robot1);
    expect(cyclicList.next()).toBe(robot2);
    cyclicList.insertItem(robot3);
    expect(cyclicList.entryPoint).toBe(robot3);
    expect(cyclicList.next()).toBe(robot1);
    expect(cyclicList.next()).toBe(robot3);
    cyclicList.removeItem(robot3);
    expect(cyclicList.entryPoint).toBe(robot2);
    expect(cyclicList.next()).toBe(robot1);
    expect(cyclicList.next()).toBe(robot2);
    expect(cyclicList.next()).toBe(robot1);
    cyclicList.insertItem(robot4);
    expect(cyclicList.entryPoint).toBe(robot4);
    expect(cyclicList.next()).toBe(robot4);
    cyclicList.removeItem(robot2);
    expect(cyclicList.next()).toBe(robot1);
    expect(cyclicList.next()).toBe(robot4);
    expect(cyclicList.next()).toBe(robot1);
  });
});
