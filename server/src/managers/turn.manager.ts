import { CyclicListStructure } from '../structures/cyclic-list/cyclic-list.structure';
import { Updatable } from './updatable';
import { Robot } from '../states/robot';

export class TurnManager implements Updatable {
  private turnNumber: number = 0;
  private readonly turn = new CyclicListStructure<Robot>({
    compare(item1: Robot, item2: Robot): number {
      return 1;
    },
  });

  constructor() {}

  public update(): void {
    this.turnNumber++;
  }
}
