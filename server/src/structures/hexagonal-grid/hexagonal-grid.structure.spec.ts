import { describe, expect, test } from 'vitest';
import { HexagonalGridStructure } from './hexagonal-grid.structure';
import { HexagonalCellError } from '../hexagonal-cell/hexagonal-cell.error';
import { HexagonalGridError } from './hexagonal-grid.error';
import { Weight } from 'shared';
import { HexagonalCellStructure } from '../hexagonal-cell/hexagonal-cell.structure';

type Land = Weight & { landType: number };

const produceCustomGrid = () => {
  const grid = new HexagonalGridStructure(5, 4);
  const weights: Weight[] = [
    { weight: 1 },
    { weight: 1 },
    { weight: 1 },
    { weight: 1 },
    { weight: 2 },
    { weight: 1 },
    { weight: 2 },
    { weight: 2 },
    { weight: 4 },
    { weight: 1 },
    { weight: 1 },
    { weight: 1 },
    { weight: 3 },
    { weight: 1 },
    { weight: 2 },
    { weight: 2 },
    { weight: 1 },
    { weight: 1 },
    { weight: 1 },
    { weight: 2 },
  ];
  grid.setAllCellItems(weights);
  return grid;
};

describe('HexagonalGridStructure', () => {
  test('HexagonalGrid get cells at specified coordinates', () => {
    //given
    const grid = new HexagonalGridStructure(10, 10);
    //when
    const expectedCoordinates = { x: -1, y: 1, z: 0 };
    const result = grid.getCellAt(expectedCoordinates);
    //then
    expect(result.coordinates).toStrictEqual(expectedCoordinates);
  });

  test('HexagonalGrid get cells at invalid coordinates', () => {
    //given
    const grid = new HexagonalGridStructure(10, 10);
    //when
    const expectedCoordinates = { x: -2, y: 1, z: 0 };
    //then
    expect(() => grid.getCellAt(expectedCoordinates)).toThrow(HexagonalCellError.invalidCoordinatesErrorMessage);
  });

  test('HexagonalGrid get cells at out of bounds coordinates', () => {
    //given
    const grid = new HexagonalGridStructure(10, 10);
    //when
    const expectedCoordinates = { x: -20, y: 10, z: 10 };
    //then
    expect(() => grid.getCellAt(expectedCoordinates)).toThrow(HexagonalGridError.outOfBoundsCoordinatesErrorMessage);
  });

  test('HexagonalGrid get cells that does not exist in the grid', () => {
    //given
    const grid = new HexagonalGridStructure(10, 10);
    grid.cells.shift(); //remove first cell (x:0 y:0 z:0)
    //when
    const expectedCoordinates = { x: 0, y: 0, z: 0 };
    //then
    expect(() => grid.getCellAt(expectedCoordinates)).toThrow(HexagonalGridError.noCellFoundErrorMessage);
  });

  test('HexagonalGrid set cells at specified coordinates', () => {
    //given
    const grid = new HexagonalGridStructure(10, 10);
    const specifiedCoordinates = { x: 2, y: 3, z: -5 };
    //when
    grid.setCellAt(specifiedCoordinates, { weight: 80 });
    //then
    expect(grid.getCellAt(specifiedCoordinates).weight()).toBe(80);
  });

  test('HexagonalGrid set cells throws if coordinates are invalid', () => {
    //given
    const grid = new HexagonalGridStructure(10, 10);
    //when
    const specifiedCoordinates = { x: -2, y: 1, z: 0 };
    //then
    expect(() => grid.setCellAt(specifiedCoordinates, { weight: 80 })).toThrow(
      HexagonalCellError.invalidCoordinatesErrorMessage
    );
  });

  test('HexagonalGrid setAllCellItems throws if items length is not equal to width*height', () => {
    //given
    const grid = new HexagonalGridStructure<Land>(8, 18);
    //when
    const expectedItems = Array.from({ length: 7 * 18 }).fill({ weight: 1, landType: 1 }) as Land[];
    //then
    expect(() => grid.setAllCellItems(expectedItems)).toThrow(HexagonalGridError.invalidItemSizeError);
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

  test('HexagonalGrid getCellsInRadius radius 0 with origin', () => {
    //given
    const grid = new HexagonalGridStructure(10, 10);
    const origin = grid.getCellAt({ x: 1, y: 2, z: -3 });
    //when
    const result = grid.getCellsInRadius(origin, 0).map(cell => cell.coordinates);
    const expected = [{ x: 1, y: 2, z: -3 }];
    //then
    expect(result).toEqual(expect.arrayContaining(expected));
    expect(result).toHaveLength(expected.length);
  });

  test('HexagonalGrid getCellsInRadius radius 0 without origin included', () => {
    //given
    const grid = new HexagonalGridStructure(10, 10);
    const origin = grid.getCellAt({ x: 1, y: 2, z: -3 });
    //when
    const result = grid.getCellsInRadius(origin, 0, false).map(cell => cell.coordinates);
    //then
    expect(result).toEqual(expect.arrayContaining([]));
    expect(result).toHaveLength(0);
  });

  test('HexagonalGrid getCellsInRadius radius 1', () => {
    //given
    const grid = new HexagonalGridStructure(10, 10);
    const origin = grid.getCellAt({ x: 1, y: 2, z: -3 });
    //when
    const result = grid.getCellsInRadius(origin, 1).map(cell => cell.coordinates);
    const expected = [
      { x: 1, y: 1, z: -2 },
      { x: 2, y: 1, z: -3 },
      { x: 2, y: 2, z: -4 },
      { x: 1, y: 2, z: -3 },
      { x: 1, y: 3, z: -4 },
      { x: 0, y: 3, z: -3 },
      { x: 0, y: 2, z: -2 },
    ];
    //then
    expect(result).toEqual(expect.arrayContaining(expected));
    expect(result).toHaveLength(expected.length);
  });

  test('HexagonalGrid getCellsInRadius radius 1 WITHOUT origin', () => {
    //given
    const grid = new HexagonalGridStructure(10, 10);
    const origin = grid.getCellAt({ x: 1, y: 2, z: -3 });
    //when
    const result = grid.getCellsInRadius(origin, 1, false).map(cell => cell.coordinates);
    const expected = [
      { x: 1, y: 1, z: -2 },
      { x: 2, y: 1, z: -3 },
      { x: 2, y: 2, z: -4 },
      { x: 1, y: 3, z: -4 },
      { x: 0, y: 3, z: -3 },
      { x: 0, y: 2, z: -2 },
    ];
    //then
    expect(result).toEqual(expect.arrayContaining(expected));
    expect(result).toHaveLength(expected.length);
  });

  test('HexagonalGrid getCellsInRadius radius 2 but it is cropped', () => {
    //given
    const grid = new HexagonalGridStructure(5, 4);
    const origin = grid.getCellAt({ x: 1, y: 2, z: -3 });
    //when
    const result = grid.getCellsInRadius(origin, 2).map(cell => cell.coordinates);
    const expected = [
      { x: 2, y: 0, z: -2 },
      { x: 3, y: 0, z: -3 },
      { x: 3, y: 1, z: -4 },
      { x: 3, y: 2, z: -5 },
      { x: 1, y: 0, z: -1 },
      { x: 2, y: 3, z: -5 },
      { x: 0, y: 1, z: -1 },
      { x: -1, y: 2, z: -1 },
      { x: -1, y: 3, z: -2 },
      { x: 1, y: 1, z: -2 },
      { x: 2, y: 1, z: -3 },
      { x: 2, y: 2, z: -4 },
      { x: 1, y: 2, z: -3 },
      { x: 1, y: 3, z: -4 },
      { x: 0, y: 3, z: -3 },
      { x: 0, y: 2, z: -2 },
    ];
    //then
    expect(result).toEqual(expect.arrayContaining(expected));
    expect(result).toHaveLength(expected.length);
  });

  test('HexagonalGrid getCellsInRadius radius 2 but it is cropped and without origin', () => {
    //given
    const grid = new HexagonalGridStructure(5, 4);
    const origin = grid.getCellAt({ x: 1, y: 2, z: -3 });
    //when
    const result = grid.getCellsInRadius(origin, 2, false).map(cell => cell.coordinates);
    const expected = [
      { x: 2, y: 0, z: -2 },
      { x: 3, y: 0, z: -3 },
      { x: 3, y: 1, z: -4 },
      { x: 3, y: 2, z: -5 },
      { x: 1, y: 0, z: -1 },
      { x: 2, y: 3, z: -5 },
      { x: 0, y: 1, z: -1 },
      { x: -1, y: 2, z: -1 },
      { x: -1, y: 3, z: -2 },
      { x: 1, y: 1, z: -2 },
      { x: 2, y: 1, z: -3 },
      { x: 2, y: 2, z: -4 },
      { x: 1, y: 3, z: -4 },
      { x: 0, y: 3, z: -3 },
      { x: 0, y: 2, z: -2 },
    ];
    //then
    expect(result).toEqual(expect.arrayContaining(expected));
    expect(result).toHaveLength(expected.length);
  });

  test('HexagonalGrid possiblePaths #1', () => {
    const grid = produceCustomGrid();
    const start: HexagonalCellStructure<Weight> = grid.getCellAt({ x: 1, y: 0, z: -1 });
    const result = grid.possiblePaths(start, 3).map(path => path.coordinatesPath);
    const expected = [
      [{ x: 1, y: 0, z: -1 }],
      [
        { x: 1, y: 0, z: -1 },
        { x: 0, y: 0, z: 0 },
      ],
      [
        { x: 1, y: 0, z: -1 },
        { x: 0, y: 0, z: 0 },
        { x: -1, y: 1, z: 0 },
      ],
      [
        { x: 1, y: 0, z: -1 },
        { x: 0, y: 0, z: 0 },
        { x: -1, y: 1, z: 0 },
        { x: -1, y: 2, z: -1 },
      ],
      [
        { x: 1, y: 0, z: -1 },
        { x: 0, y: 0, z: 0 },
        { x: 0, y: 1, z: -1 },
      ],
      [
        { x: 1, y: 0, z: -1 },
        { x: 2, y: 0, z: -2 },
      ],
      [
        { x: 1, y: 0, z: -1 },
        { x: 2, y: 0, z: -2 },
        { x: 3, y: 0, z: -3 },
      ],
      [
        { x: 1, y: 0, z: -1 },
        { x: 2, y: 0, z: -2 },
        { x: 3, y: 0, z: -3 },
        { x: 3, y: 1, z: -4 },
      ],
      [
        { x: 1, y: 0, z: -1 },
        { x: 2, y: 0, z: -2 },
        { x: 1, y: 1, z: -2 },
      ],
      [
        { x: 1, y: 0, z: -1 },
        { x: 0, y: 1, z: -1 },
      ],
      [
        { x: 1, y: 0, z: -1 },
        { x: 0, y: 1, z: -1 },
        { x: 0, y: 0, z: 0 },
      ],
      [
        { x: 1, y: 0, z: -1 },
        { x: 0, y: 1, z: -1 },
        { x: -1, y: 1, z: 0 },
      ],
      [
        { x: 1, y: 0, z: -1 },
        { x: 0, y: 1, z: -1 },
        { x: -1, y: 2, z: -1 },
      ],
      [
        { x: 1, y: 0, z: -1 },
        { x: 0, y: 1, z: -1 },
        { x: 0, y: 2, z: -2 },
      ],
      [
        { x: 1, y: 0, z: -1 },
        { x: 1, y: 1, z: -2 },
      ],
      [
        { x: 1, y: 0, z: -1 },
        { x: 1, y: 1, z: -2 },
        { x: 2, y: 0, z: -2 },
      ],
      [
        { x: 1, y: 0, z: -1 },
        { x: 1, y: 1, z: -2 },
        { x: 0, y: 2, z: -2 },
      ],
    ];

    expect(result).toEqual(expect.arrayContaining(expected));
    expect(result).toHaveLength(expected.length);
  });

  test('HexagonalGrid possiblePaths #2', () => {
    const grid = produceCustomGrid();
    const start: HexagonalCellStructure<Weight> = grid.getCellAt({ x: 0, y: 1, z: -1 });
    const result = grid.possiblePaths(start, 1).map(path => path.coordinatesPath);
    const expected = [
      [{ x: 0, y: 1, z: -1 }],
      [
        { x: 0, y: 1, z: -1 },
        { x: 0, y: 0, z: 0 },
      ],
      [
        { x: 0, y: 1, z: -1 },
        { x: 1, y: 0, z: -1 },
      ],
      [
        { x: 0, y: 1, z: -1 },
        { x: -1, y: 1, z: 0 },
      ],
      [
        { x: 0, y: 1, z: -1 },
        { x: -1, y: 2, z: -1 },
      ],
      [
        { x: 0, y: 1, z: -1 },
        { x: 0, y: 2, z: -2 },
      ],
    ];
    expect(result).toEqual(expect.arrayContaining(expected));
    expect(result).toHaveLength(expected.length);
  });

  test('HexagonalGrid possiblePaths #3', () => {
    const grid = produceCustomGrid();
    const start: HexagonalCellStructure<Weight> = grid.getCellAt({ x: 3, y: 1, z: -4 });
    const result = grid.possiblePaths(start, 4).map(path => path.coordinatesPath);
    const expected = [
      [{ x: 3, y: 1, z: -4 }],
      [
        { x: 3, y: 1, z: -4 },
        { x: 3, y: 0, z: -3 },
      ],
      [
        { x: 3, y: 1, z: -4 },
        { x: 3, y: 0, z: -3 },
        { x: 2, y: 0, z: -2 },
      ],
      [
        { x: 3, y: 1, z: -4 },
        { x: 3, y: 0, z: -3 },
        { x: 2, y: 0, z: -2 },
        { x: 1, y: 0, z: -1 },
      ],
      [
        { x: 3, y: 1, z: -4 },
        { x: 3, y: 0, z: -3 },
        { x: 2, y: 0, z: -2 },
        { x: 1, y: 0, z: -1 },
        { x: 0, y: 0, z: 0 },
      ],
      [
        { x: 3, y: 1, z: -4 },
        { x: 3, y: 0, z: -3 },
        { x: 2, y: 0, z: -2 },
        { x: 1, y: 1, z: -2 },
      ],
      [
        { x: 3, y: 1, z: -4 },
        { x: 3, y: 0, z: -3 },
        { x: 4, y: 0, z: -4 },
      ],
      [
        { x: 3, y: 1, z: -4 },
        { x: 4, y: 0, z: -4 },
      ],
      [
        { x: 3, y: 1, z: -4 },
        { x: 4, y: 0, z: -4 },
        { x: 3, y: 0, z: -3 },
      ],
      [
        { x: 3, y: 1, z: -4 },
        { x: 4, y: 0, z: -4 },
        { x: 3, y: 0, z: -3 },
        { x: 2, y: 0, z: -2 },
      ],
      [
        { x: 3, y: 1, z: -4 },
        { x: 2, y: 1, z: -3 },
      ],
      [
        { x: 3, y: 1, z: -4 },
        { x: 2, y: 2, z: -4 },
      ],
      [
        { x: 3, y: 1, z: -4 },
        { x: 2, y: 2, z: -4 },
        { x: 1, y: 2, z: -3 },
      ],
      [
        { x: 3, y: 1, z: -4 },
        { x: 2, y: 2, z: -4 },
        { x: 3, y: 2, z: -5 },
      ],
      [
        { x: 3, y: 1, z: -4 },
        { x: 2, y: 2, z: -4 },
        { x: 1, y: 3, z: -4 },
      ],
      [
        { x: 3, y: 1, z: -4 },
        { x: 2, y: 2, z: -4 },
        { x: 1, y: 3, z: -4 },
        { x: 0, y: 3, z: -3 },
      ],
      [
        { x: 3, y: 1, z: -4 },
        { x: 2, y: 2, z: -4 },
        { x: 1, y: 3, z: -4 },
        { x: 0, y: 3, z: -3 },
        { x: 0, y: 2, z: -2 },
      ],
      [
        { x: 3, y: 1, z: -4 },
        { x: 2, y: 2, z: -4 },
        { x: 1, y: 3, z: -4 },
        { x: 0, y: 3, z: -3 },
        { x: -1, y: 3, z: -2 },
      ],
      [
        { x: 3, y: 1, z: -4 },
        { x: 2, y: 2, z: -4 },
        { x: 1, y: 3, z: -4 },
        { x: 2, y: 3, z: -5 },
      ],
      [
        { x: 3, y: 1, z: -4 },
        { x: 2, y: 2, z: -4 },
        { x: 2, y: 3, z: -5 },
      ],
      [
        { x: 3, y: 1, z: -4 },
        { x: 2, y: 2, z: -4 },
        { x: 2, y: 3, z: -5 },
        { x: 1, y: 3, z: -4 },
      ],
      [
        { x: 3, y: 1, z: -4 },
        { x: 3, y: 2, z: -5 },
      ],
      [
        { x: 3, y: 1, z: -4 },
        { x: 3, y: 2, z: -5 },
        { x: 2, y: 2, z: -4 },
      ],
      [
        { x: 3, y: 1, z: -4 },
        { x: 3, y: 2, z: -5 },
        { x: 2, y: 2, z: -4 },
        { x: 1, y: 3, z: -4 },
      ],
      [
        { x: 3, y: 1, z: -4 },
        { x: 3, y: 2, z: -5 },
        { x: 2, y: 3, z: -5 },
      ],
    ];
    expect(result).toEqual(expect.arrayContaining(expected));
    expect(result).toHaveLength(expected.length);
  });
});
