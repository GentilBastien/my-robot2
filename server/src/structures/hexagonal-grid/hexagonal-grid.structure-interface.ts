import { HexagonalCellStructure } from '../hexagonal-cell/hexagonal-cell.structure';
import { Weight } from 'shared';

export interface HexagonalGridStructureInterface<T extends Weight> {
  /**
   * The width of the map.
   */
  width: number;

  /**
   * The height of the map.
   */
  height: number;

  /**
   * The {@link HexagonalCellStructure} cells of the map.
   */
  cells: HexagonalCellStructure<T>[];

  /**
   *
   * @param start
   * @param end
   */
  shortestPathTo(start: HexagonalCellStructure<T>, end: HexagonalCellStructure<T>): HexagonalCellStructure<T>[];

  /**
   *
   * @param start
   * @param maxCost
   */
  possibleTargets(start: HexagonalCellStructure<T>, maxCost: number): HexagonalCellStructure<T>[];

  /**
   *
   * @param origin
   * @param radius
   */
  getCellsInRadius(origin: HexagonalCellStructure<T>, radius: number): HexagonalCellStructure<T>[];
}
