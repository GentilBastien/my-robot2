import { HexagonalCellStructure } from '../hexagonal-cell/hexagonal-cell.structure';
import { Coordinates, Weight } from 'shared';

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
   * Returns the cell at the given coordinates.
   * @param coordinates The given coordinates.
   * @throws {invalidCoordinatesError} if given coordinates are invalid (sum of x+y+z different from 0).
   * @throws {noCellFoundError} if no cell have the given coordinates.
   * @throws {outOfBoundsCoordinatesError} if the given coordinates are off the grid width/height.
   */
  cellAt(coordinates: Coordinates): HexagonalCellStructure<T>;

  /**
   * Returns the cells that must be crossed to make the shortest path between two cells.
   * @param start The starting cell.
   * @param end The ending cell.
   */
  shortestPathTo(start: HexagonalCellStructure<T>, end: HexagonalCellStructure<T>): HexagonalCellStructure<T>[];

  /**
   * Returns the reachable cells knowing a starting cell and a maximum cost. This is useful to know where
   * an entity can move to, knowing its remaining movement. As a reminder, cells are weighted and every cell
   * do not have the same weight.
   * @param start The starting cell.
   * @param maxCost The maximum cost allowed from the starting cell.
   */
  possibleTargets(start: HexagonalCellStructure<T>, maxCost: number): HexagonalCellStructure<T>[];

  /**
   * Returns the cells adjacent to the origin cell in parameter with a given radius.
   * @param origin Origin cell.
   * @param radius The radius.
   */
  getCellsInRadius(origin: HexagonalCellStructure<T>, radius: number): HexagonalCellStructure<T>[];
}
