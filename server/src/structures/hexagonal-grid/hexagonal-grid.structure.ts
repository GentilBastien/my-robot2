import { HexagonalGridStructureInterface } from './hexagonal-grid.structure-interface';
import { HexagonalCellStructure } from '../hexagonal-cell/hexagonal-cell.structure';
import { Coordinates, Weight } from 'shared';
import { HexagonalCellDirectionEnum } from '../hexagonal-cell/hexagonal-cell-direction.enum';
import { HexagonalGridError } from './hexagonal-grid.error';
import { HexagonalCellError } from '../hexagonal-cell/hexagonal-cell.error';

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

  public cellAt(coordinates: Coordinates): HexagonalCellStructure<T> {
    if (coordinates.x + coordinates.y + coordinates.z !== 0) {
      throw HexagonalCellError.invalidCoordinatesError;
    }
    const found: HexagonalCellStructure<T> | undefined = this._cells.find(cell => cell.isLocatedAt(coordinates));
    if (!found) throw new HexagonalGridError();
    return found;
  }

  public getCellsInRadius(origin: HexagonalCellStructure<T>, radius: number): HexagonalCellStructure<T>[] {
    return this._cells.filter(
      cell =>
        Math.abs(origin.x - cell.x) <= radius &&
        Math.abs(origin.y - cell.y) <= radius &&
        Math.abs(origin.z - cell.z) <= radius
    );
  }

  public possibleTargets(start: HexagonalCellStructure<T>, maxCost: number): HexagonalCellStructure<T>[] {
    const queue: HexagonalCellStructure<T>[] = [start];
    const visited: HexagonalCellStructure<T>[] = [];
    this.possibleTargets_NewMove(queue, visited, 0, maxCost);
    return visited;
  }

  public shortestPathTo(start: HexagonalCellStructure<T>, end: HexagonalCellStructure<T>): HexagonalCellStructure<T>[] {
    return [];
  }

  private possibleTargets_NewMove(
    queue: HexagonalCellStructure<T>[],
    visited: HexagonalCellStructure<T>[],
    costFromStart: number,
    maxCostFromStart: number
  ): void {
    if (queue.length === 0) return;
    const cellCandidate: HexagonalCellStructure<T> = queue.shift()!;
    const costCandidate: number = costFromStart + cellCandidate.weight();
    if (costCandidate <= maxCostFromStart) {
      //candidate is valid, add it in the valid cells and check its adjacent cells.
      visited.push(cellCandidate);
      this.getCellsInRadius(cellCandidate, 1)
        .filter(adjacentCell => !visited.includes(adjacentCell))
        .forEach(adjacentCell => {
          queue.push(adjacentCell);
          this.possibleTargets_NewMove(queue, visited, costFromStart, maxCostFromStart);
        });
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
