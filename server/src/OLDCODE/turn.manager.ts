import { CyclicListStructure } from '@structures/cyclic-list/cyclic-list.structure';
import { Robot } from '@entities/robot/robot';
import { Comparator } from 'shared';

export class TurnManager {
  private turns: CyclicListStructure<Robot>;
  private currentTurnNumber: number;
  private currentTurnRobot: Robot | undefined;

  constructor(robots: Robot[]) {
    const orderToPlayComparator: Comparator<Robot> = {
      compare(item1: Robot, item2: Robot): number {
        return 1;
      },
    };
    this.turns = new CyclicListStructure<Robot>(orderToPlayComparator);
    this.addRobotsToCyclicList(robots);
    this.currentTurnNumber = 0;
    this.currentTurnRobot = this.turns.entryPoint;
  }

  private addRobotsToCyclicList(robots: Robot[]): void {
    for (const robot of robots) {
      this.turns.insertItem(robot);
    }
  }
}
