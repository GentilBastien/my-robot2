import { describe, expect, test } from 'vitest';
import { CyclicListStructure } from './cyclic-list.structure';
import { Weight } from 'shared';
import { CyclicListError } from './cyclic-list.error';

type Robot = {
  name: string;
};
type InitiativeRobotType = Robot & Weight;
class InitiativeRobot implements InitiativeRobotType {
  constructor(
    public name: string,
    public weight: number
  ) {}
}
describe('CyclicListStructure', () => {
  const robot1 = new InitiativeRobot('wassim', 2);
  const robot2 = new InitiativeRobot('raphael', 4);
  const robot3 = new InitiativeRobot('bast', 8);
  const robot3bis = new InitiativeRobot('bast2', 8);
  const robot4 = new InitiativeRobot('jade', 12);

  test('CyclicList empty', () => {
    //given
    const cyclicList = new CyclicListStructure<InitiativeRobot>();
    //then
    expect(cyclicList.entryPoint).toBe(undefined);
  });

  test('CyclicList insert one item in empty list', () => {
    //given
    const cyclicList = new CyclicListStructure<InitiativeRobot>();
    //when
    cyclicList.insertItem(robot1);
    //then
    expect(cyclicList.entryPoint).toBe(robot1);
  });

  test('CyclicList insert before', () => {
    //given
    const cyclicList = new CyclicListStructure<InitiativeRobot>();
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
    const cyclicList = new CyclicListStructure<InitiativeRobot>();
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
    const cyclicList = new CyclicListStructure<InitiativeRobot>();
    cyclicList.insertItem(robot1);
    cyclicList.insertItem(robot2);
    cyclicList.insertItem(robot3);
    //then
    cyclicList.insertItem(robot3bis);
    expect(cyclicList.entryPoint).toBe(robot3);
  });

  test('CyclicList next cycles correctly over several iterations', () => {
    //given
    const nIterations = 10;
    const cyclicList = new CyclicListStructure<InitiativeRobot>();
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
    const cyclicList = new CyclicListStructure<InitiativeRobot>();
    //then
    expect(() => cyclicList.next()).toThrow(CyclicListError.nextOnEmptyListErrorMessage);
  });
});
