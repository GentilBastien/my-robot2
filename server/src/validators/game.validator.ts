import { HexagonalGridStructure } from '@structures/hexagonal-grid/hexagonal-grid.structure';
import { Weight } from 'shared';

export class GameValidator {
  private readonly hexGrid = new HexagonalGridStructure<Weight>(10, 10);
}
