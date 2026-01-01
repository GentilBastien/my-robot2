import { describe, expect, test } from 'vitest';
import { HexagonalGridStructure } from './hexagonal-grid.structure';
import { HexagonalCellError } from '../hexagonal-cell/hexagonal-cell.error';
import { HexagonalGridError } from './hexagonal-grid.error';

describe('HexagonalGridStructure', () => {
  test('HexagonalGrid get cells at specified coordinates', () => {
    //given
    const grid = new HexagonalGridStructure(10, 10);
    //when
    const expectedCoordinates = { x: -1, y: 1, z: 0 };
    const result = grid.cellAt(expectedCoordinates);
    //then
    expect(result.coordinates).toStrictEqual(expectedCoordinates);
  });

  test('HexagonalGrid get cells at invalid coordinates', () => {
    //given
    const grid = new HexagonalGridStructure(10, 10);
    //when
    const expectedCoordinates = { x: -2, y: 1, z: 0 };
    //then
    expect(() => grid.cellAt(expectedCoordinates)).toThrow(HexagonalCellError.invalidCoordinatesErrorMessage);
  });

  test('HexagonalGrid get cells at out of bounds coordinates', () => {
    //given
    const grid = new HexagonalGridStructure(10, 10);
    //when
    const expectedCoordinates = { x: -20, y: 10, z: 10 };
    //then
    expect(() => grid.cellAt(expectedCoordinates)).toThrow(HexagonalGridError.outOfBoundsCoordinatesErrorMessage);
  });

  test('HexagonalGrid get cells at out of bounds coordinates', () => {
    //given
    const grid = new HexagonalGridStructure(10, 10);
    grid.cells.shift(); //remove first cell (x:0 y:0 z:0)
    //when
    const expectedCoordinates = { x: 0, y: 0, z: 0 };
    //then
    expect(() => grid.cellAt(expectedCoordinates)).toThrow(HexagonalGridError.noCellFoundErrorMessage);
  });

  test('HexagonalGrid setAllCoordinates with any widths or heights', () => {
    const testGridWidthHeight = (width: number, height: number) => {
      const grid = new HexagonalGridStructure(width, height);
      let row = 0;
      let column = 0;
      let cellOffset = 0;
      grid.cells.forEach((cell, index) => {
        cellOffset = Math.floor((row + 1) / 2);
        expect(cell.coordinates).toStrictEqual({
          x: column - cellOffset,
          y: row,
          z: -row - column + cellOffset,
        });
        column++;
        if ((index + 1) % width === 0) {
          row++;
          column = 0;
        }
      });
    };
    for (let width = 0; width < 10; width++) {
      for (let height = 0; height < 10; height++) {
        testGridWidthHeight(width, height);
      }
    }
  });

  // test('HexagonalGrid get cells in radius of origin (top left)', () => {
  //   //given
  //   const grid = new HexagonalGridStructure(30, 30);
  //   //when
  //   const result = grid.getCellsInRadius();
  //   //then
  // });
});
