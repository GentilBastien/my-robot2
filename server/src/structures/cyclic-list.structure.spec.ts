import { CyclicListStructure } from './cyclic-list.structure';
import { Comparable } from 'shared';

type Robot = {
  name: string;
  initiative: number;
};
type ComparableRobotType = Robot & Comparable<Robot>;
class ComparableRobot implements ComparableRobotType {
  constructor(
    public name: string,
    public initiative: number
  ) {}
  compareTo(other: ComparableRobot): number {
    return this.initiative - other.initiative;
  }
}
describe('CyclicListStructure', () => {
  const robot1 = new ComparableRobot('raphael', 4);
  const robot2 = new ComparableRobot('wassim', 2);
  const robot3 = new ComparableRobot('jade', 12);
  const robot4 = new ComparableRobot('bast', 8);

  test('isCyclicListSorted', () => {
    //given
    const cyclicList: CyclicListStructure<ComparableRobot> = new CyclicListStructure([robot1, robot2, robot3, robot4]);
    //then
    expect(cyclicList.items).toStrictEqual([robot3, robot4, robot1, robot2]);
  });
});
