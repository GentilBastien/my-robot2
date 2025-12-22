import { CyclicListStructure } from '../structures/cyclic-list.structure.js';
import { ComparableRobot } from 'shared';

export class TurnManager {
  constructor() {
    const a = new CyclicListStructure<ComparableRobot>([]);
  }
}
