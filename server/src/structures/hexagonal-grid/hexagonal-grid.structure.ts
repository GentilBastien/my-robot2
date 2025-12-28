import { HexagonalGridStructureInterface } from './hexagonal-grid.structure-interface';
import { HexagonalCellStructure } from '../hexagonal-cell/hexagonal-cell.structure';
import { Weight } from 'shared/dist';

export class HexagonalGridStructure<T extends Weight> implements HexagonalGridStructureInterface<T> {
  private readonly _cells: HexagonalCellStructure<T>[];
  private readonly _width: number;
  private readonly _height: number;

  constructor(width: number, height: number) {
    this._cells = [];
    this._width = width;
    this._height = height;
    this.setAllCells(width, height);
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

  private setAllCells(width: number, height: number): void {
    let cellFirstColumn: HexagonalCellStructure<T> | undefined = undefined;
    let previous: HexagonalCellStructure<T> | undefined = undefined;
    let cellOffset: CellOffset = CellOffset.RIGHT;

    for (let row = 0; row < height; row++) {
      cellOffset = cellOffset === CellOffset.LEFT ? CellOffset.RIGHT : CellOffset.LEFT; //toggle every row
      const newCellFirstColumn = new HexagonalCellStructure<T>(null);
      this.setCellUnder(newCellFirstColumn, cellOffset, cellFirstColumn);
      cellFirstColumn = newCellFirstColumn;
      previous = newCellFirstColumn;

      for (let column = 1; column < width; column++) {
        const newCell = new HexagonalCellStructure<T>(null);
        this.setCellAfter(newCell, previous);
        previous = newCell;
      }
    }
  }

  /**
   * Horizontally set a cell coordinates after another one. If no previous cell
   * is provided, (0,0,0) coordinates are set.
   * @param cell The cell to add.
   * @param previousCell The cell preceding the cell to add.
   */
  private setCellAfter(cell: HexagonalCellStructure<T>, previousCell?: HexagonalCellStructure<T>): void {
    if (previousCell) {
      cell.x = previousCell.x + 1;
      cell.y = previousCell.y;
      cell.z = previousCell.z - 1;
    } else {
      cell.x = 0;
      cell.y = 0;
      cell.z = 0;
    }
  }

  /**
   * Vertically set a cell coordinates under another one. If no previous cell
   * is provided, (0,0,0) coordinates are set.
   * @param cell The cell to add.
   * @param offset LEFT or RIGHT
   * @param previousCell The cell preceding the cell to add.
   */
  private setCellUnder(
    cell: HexagonalCellStructure<T>,
    offset: CellOffset,
    previousCell?: HexagonalCellStructure<T>
  ): void {
    if (previousCell) {
      switch (offset) {
        case CellOffset.RIGHT: {
          cell.x = previousCell.x;
          cell.y = previousCell.y + 1;
          cell.z = previousCell.z - 1;
          break;
        }
        case CellOffset.LEFT: {
          cell.x = previousCell.x - 1;
          cell.y = previousCell.y + 1;
          cell.z = previousCell.z;
          break;
        }
      }
    } else {
      cell.x = 0;
      cell.y = 0;
      cell.z = 0;
    }
  }
}

/**
 * A hexagonal grid have a cell offset when adding vertically.
 */
enum CellOffset {
  LEFT,
  RIGHT,
}
