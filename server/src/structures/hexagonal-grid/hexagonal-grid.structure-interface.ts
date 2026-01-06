import { HexagonalCellStructure } from '../hexagonal-cell/hexagonal-cell.structure';
import { Coordinates, PathCoordinate, Weight } from 'shared';

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
  getCellAt(coordinates: Coordinates): HexagonalCellStructure<T>;

  /**
   * Set an item in the cell located at the given coordinates. Returns the previous item in it.
   * @param coordinates The coordinates to get a single cell.
   * @param item The new item to set.
   * @throws {invalidCoordinatesError} if given coordinates are invalid (sum of x+y+z different from 0).
   * @throws {noCellFoundError} if no cell have the given coordinates.
   * @throws {outOfBoundsCoordinatesError} if the given coordinates are off the grid width/height.
   */
  setCellAt(coordinates: Coordinates, item: T | null): T | null;

  /**
   * Set all cells with an item.
   * @param items The items to set.
   * @throws {invalidItemSizeError} if length of the given parameter is different from
   * grid's {@linkcode width} * {@linkcode height}
   */
  setAllCellItems(items: T[]): void;

  /**
   * Returns the cells adjacent to the origin cell in parameter with a given radius. If the origin cell was
   * on the grid borders, only the concerned cells are returned. Just note that it does not always return a
   * 6 length array.
   * - Radius ``0`` will return the origin cell only
   * - If radius is ``0`` and includeOrigin is ``false``, an empty array is returned
   *
   * The origin cell is returned when given radius 0 will return a 1 length array containing the
   * origin cell only.
   * @param origin Origin cell.
   * @param radius The radius.
   * @param includeOrigin If origin cell should be included in the returned cells. Default is true.
   */
  getCellsInRadius(
    origin: HexagonalCellStructure<T>,
    radius: number,
    includeOrigin?: boolean
  ): HexagonalCellStructure<T>[];

  /**
   * Returns the reachable cells knowing a starting cell and a maximum cost. This is useful to know where an entity can
   * move to, knowing its remaining movement. As a reminder, cells are weighted and every cell do not have the same
   * weight.
   * @param start The starting cell.
   * @param maxCost The maximum cost allowed from the starting cell.
   */
  possiblePaths(start: HexagonalCellStructure<T>, maxCost: number): PathCoordinate[];

  /**
   * Returns the shortest path between two cells.
   * @param start The starting cell.
   * @param end The ending cell.
   */
  shortestPathTo(start: HexagonalCellStructure<T>, end: HexagonalCellStructure<T>): PathCoordinate;
}
