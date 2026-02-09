import { HexagonalGridStructure } from '@structures/hexagonal-grid/hexagonal-grid.structure';
import { Comparator, Weight } from 'shared';
import { CyclicListStructure } from '@structures/cyclic-list/cyclic-list.structure';
import { GameConfig } from '../game.config';

type InitiativeRobot = {
  id: string;
  initiative: number;
};

export class GameCalculator {
  private readonly hexGrid: HexagonalGridStructure<Weight>;
  private readonly turnOrder: CyclicListStructure<InitiativeRobot>;

  constructor(gameConfig: GameConfig) {
    this.hexGrid = new HexagonalGridStructure<Weight>(gameConfig.mapWidth, gameConfig.mapHeight);
    const robotComparator: Comparator<InitiativeRobot> = {
      compare(robot1: InitiativeRobot, robot2: InitiativeRobot): number {
        return robot1.initiative - robot2.initiative;
      },
    };
    this.turnOrder = new CyclicListStructure<InitiativeRobot>(robotComparator);
  }
}
