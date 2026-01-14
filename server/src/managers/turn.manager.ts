import { Updatable } from 'shared';
import { CyclicListStructure } from '../structures/cyclic-list/cyclic-list.structure';

export class TurnManager implements Updatable {
  private turnNumber: number = 0;
  private readonly turn = new CyclicListStructure();

  constructor() {}

  public update(): void {
    this.turnNumber++;
  }
}
