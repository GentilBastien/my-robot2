import { CyclicListStructure } from '@structures/cyclic-list/cyclic-list.structure';
import { RobotState } from '@states/robot.state';
import { Comparator } from 'shared';

export class TurnManager {
  private turns: CyclicListStructure<RobotState>;
  private currentTurnNumber: number;
  private currentTurnRobot: RobotState | undefined;

  constructor(robots: RobotState[]) {
    const orderToPlayComparator: Comparator<RobotState> = {
      compare(item1: RobotState, item2: RobotState): number {
        return 1;
      },
    };
    this.turns = new CyclicListStructure<RobotState>(orderToPlayComparator);
    this.addRobotsToCyclicList(robots);
    this.currentTurnNumber = 0;
    this.currentTurnRobot = this.turns.entryPoint;
  }

  private addRobotsToCyclicList(robots: RobotState[]): void {
    for (const robot of robots) {
      this.turns.insertItem(robot);
    }
  }
}
