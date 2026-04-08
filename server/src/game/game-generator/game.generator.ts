import { HexagonalGridStructure } from '@structures/hexagonal-grid/hexagonal-grid.structure';
import { Weight } from 'shared';
import { GameConfig } from '../game.config';

export class GameGenerator {
  private readonly hexGrid: HexagonalGridStructure<Weight>;

  constructor(gameConfig: GameConfig) {
    this.hexGrid = new HexagonalGridStructure<Weight>(gameConfig.mapWidth, gameConfig.mapHeight);
  }

  public build(): HexagonalGridStructure<Weight> {
    return new HexagonalGridStructure<Weight>(10, 10); //TODO
  }
}
