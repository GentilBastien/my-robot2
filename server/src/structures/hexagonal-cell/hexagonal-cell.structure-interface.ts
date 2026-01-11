import { HexagonalCellStructure } from './hexagonal-cell.structure';
import { Coordinates, Weight } from 'shared';
import { HexagonalCellDirectionEnum } from './hexagonal-cell-direction.enum';

/**
 * A cell with a hexagonal form in a 3 axis coordinates representation. Used as
 * a wrapper for a generic weighted item.
 */
export interface HexagonalCellStructureInterface<T extends Weight> {
  /**
   * X coordinates of the cell.
   */
  x: number;

  /**
   * Y coordinates of the cell.
   */
  y: number;

  /**
   * Z coordinates of the cell.
   */
  z: number;

  /**
   * Coordinates of the cell.
   */
  coordinates: Coordinates;

  /**
   * The weight hold by the cell.
   */
  weight(): number;

  weightFromStart: number;
  distanceFromTarget: number;
  travelSegments: number;

  /**
   * Sets this cell's coordinates.
   * @param coordinates The new coordinates.
   */
  setCoordinates(coordinates: Coordinates): void;

  /**
   * Sets this cell's coordinates adjacent to another cell coordinates according to the
   * given direction.
   * @param otherCell Other cell coordinates used.
   * @param direction The direction where this cell should be adjacent to.
   */
  setCoordinatesAdjacentTo(otherCell: HexagonalCellStructure<T>, direction: HexagonalCellDirectionEnum): void;

  /**
   * Returns true if the cell in parameter has the same location as this cell.
   * @param otherCell The cell to compare this cell with.
   */
  hasSameLocationWith(otherCell: HexagonalCellStructure<T>): boolean;

  /**
   * Returns true if the given coordinates are this cell's one.
   * @param coordinates Given coordinates
   * @throws {invalidCoordinatesError} if given coordinates are invalid (sum of x+y+z different from 0).
   */
  isLocatedAt(coordinates: Coordinates): boolean;

  /**
   * Returns true if the cell in parameter is adjacent to this cell.
   * @param otherCell The cell to text this cell with.
   */
  isAdjacentTo(otherCell: HexagonalCellStructure<T>): boolean;

  /**
   * Returns the Euclidean distance between two cells.
   * @param otherCell The cell to where the distance is calculated from.
   */
  euclideanDistanceFrom(otherCell: HexagonalCellStructure<T>): number;

  /**
   * Returns the Cube distance between two cells.
   * @param otherCell The cell to where the distance is calculated from.
   */
  cubeDistanceFrom(otherCell: HexagonalCellStructure<T>): number;

  /**
   * A setter for the item wrapped in this hexagonal cell.
   * @param item The item to set.
   */
  setItem(item: T | null): void;

  /**
   * Returns true if the cell in parameter has the same item wrapped in it as this cell.
   * @param otherCell The cell to compare this cell with.
   */
  hasSameItem(otherCell: HexagonalCellStructure<T>): boolean;

  /**
   * Get the item in this wrapper. Throws if no item found.
   * @throws {noItemError} If the list is empty.
   */
  getItemOrThrow(): T;

  /**
   * Get the item in this wrapper. Returns a default value of no item found.
   * @param defaultItem The default item to return if nothing found.
   */
  getItemOrDefault(defaultItem: T): T;

  /**
   * Returns true if this wrapper contains an item.
   */
  hasItem(): boolean;
}
