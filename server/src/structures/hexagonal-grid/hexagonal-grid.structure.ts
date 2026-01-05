import { HexagonalGridStructureInterface } from './hexagonal-grid.structure-interface';
import { HexagonalCellStructure } from '../hexagonal-cell/hexagonal-cell.structure';
import { Coordinates, Weight } from 'shared';
import { HexagonalCellDirectionEnum } from '../hexagonal-cell/hexagonal-cell-direction.enum';
import { HexagonalGridError } from './hexagonal-grid.error';

export class HexagonalGridStructure<T extends Weight> implements HexagonalGridStructureInterface<T> {
  private readonly _cells: HexagonalCellStructure<T>[];
  private readonly _width: number;
  private readonly _height: number;

  constructor(width: number, height: number) {
    this._cells = [];
    this._width = width;
    this._height = height;
    this.setAllCellCoordinates(width, height);
  }

  public get cells(): HexagonalCellStructure<T>[] {
    return this._cells;
  }

  public get width(): number {
    return this._width;
  }

  public get height(): number {
    return this._height;
  }

  public getCellAt(coordinates: Coordinates): HexagonalCellStructure<T> {
    if (coordinates.x > this._width - 1 || coordinates.y > this._height - 1) {
      throw HexagonalGridError.outOfBoundsCoordinatesError;
    }
    const found: HexagonalCellStructure<T> | undefined = this._cells.find(cell => cell.isLocatedAt(coordinates));
    if (!found) throw HexagonalGridError.noCellFoundError;
    return found;
  }

  public setCellAt(coordinates: Coordinates, item: T | null): T | null {
    if (coordinates.x > this._width - 1 || coordinates.y > this._height - 1) {
      throw HexagonalGridError.outOfBoundsCoordinatesError;
    }
    const found: HexagonalCellStructure<T> | undefined = this._cells.find(cell => cell.isLocatedAt(coordinates));
    if (!found) throw HexagonalGridError.noCellFoundError;
    let previousItem = null;
    if (found.hasItem()) {
      previousItem = found.getItemOrThrow();
    }
    found.setItem(item);
    return previousItem;
  }

  public setAllCellItems(items: T[]): void {
    const totalCells: number = this._width * this._height;
    if (items.length !== totalCells) {
      throw HexagonalGridError.invalidItemSizeError;
    }
    for (let index = 0; index < totalCells; index++) {
      this._cells[index].setItem(items[index]);
    }
  }

  public getCellsInRadius(
    origin: HexagonalCellStructure<T>,
    radius: number,
    includeOrigin: boolean = true
  ): HexagonalCellStructure<T>[] {
    if (radius === 0) {
      return includeOrigin ? [origin] : [];
    } else {
      return this._cells.filter(cell =>
        cell.hasSameLocationWith(origin)
          ? includeOrigin
          : Math.abs(origin.x - cell.x) <= radius &&
            Math.abs(origin.y - cell.y) <= radius &&
            Math.abs(origin.z - cell.z) <= radius
      );
    }
  }

  public possibleTargets(start: HexagonalCellStructure<T>, maxCost: number): HexagonalCellStructure<T>[] {
    const visitedPaths: HexagonalCellStructure<T>[][] = [];
    this.possibleTargets_NewMove(start, visitedPaths, -start.weight(), maxCost);
    return visitedPaths.map(a => a.pop()!).filter((item, index, self) => self.indexOf(item) === index);
  }

  public shortestPathTo(start: HexagonalCellStructure<T>, end: HexagonalCellStructure<T>): HexagonalCellStructure<T>[] {
    return [];
  }

  private possibleTargets_NewMove(
    cellCandidate: HexagonalCellStructure<T>,
    visitedPaths: HexagonalCellStructure<T>[][],
    costFromStart: number,
    maxCostFromStart: number,
    pathToCandidate?: HexagonalCellStructure<T>[] = []
  ): void {
    const costCandidate: number = costFromStart + cellCandidate.weight();
    if (costCandidate <= maxCostFromStart) {
      //candidate is valid, add it in the valid cells and check its adjacent cells.
      const path = pathToCandidate.concat(cellCandidate);
      visitedPaths.push(path);
      this.getCellsInRadius(cellCandidate, 1, false).forEach(adjacentCell =>
        this.possibleTargets_NewMove(adjacentCell, visitedPaths, costCandidate, maxCostFromStart, path)
      );
    }
  }

  private setAllCellCoordinates(width: number, height: number): void {
    if (!width || !height) {
      return;
    }
    let cellFirstColumn: HexagonalCellStructure<T> | undefined = undefined;
    let previous: HexagonalCellStructure<T> | undefined = undefined;
    let cellOffset = false;

    for (let row = 0; row < height; row++) {
      cellOffset = !cellOffset; //toggle every row
      const newCellFirstColumn = new HexagonalCellStructure<T>(null);
      if (cellFirstColumn) {
        newCellFirstColumn.setCoordinatesAdjacentTo(
          cellFirstColumn,
          cellOffset ? HexagonalCellDirectionEnum.BOTTOM_RIGHT : HexagonalCellDirectionEnum.BOTTOM_LEFT
        );
      } else {
        newCellFirstColumn.setCoordinates({ x: 0, y: 0, z: 0 });
      }
      this._cells.push(newCellFirstColumn);
      cellFirstColumn = newCellFirstColumn;
      previous = newCellFirstColumn;

      for (let column = 1; column < width; column++) {
        const newCell = new HexagonalCellStructure<T>(null);
        newCell.setCoordinatesAdjacentTo(previous!, HexagonalCellDirectionEnum.RIGHT);
        this._cells.push(newCell);
        previous = newCell;
      }
    }
  }
}
