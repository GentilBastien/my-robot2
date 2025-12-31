import { describe, expect, test } from 'vitest';
import { HexagonalGridStructure } from './hexagonal-grid.structure';

describe('HexagonalGridStructure', () => {
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
});
