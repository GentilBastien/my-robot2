import { describe, expect, test } from 'vitest';
import { HexagonalCellStructure } from './hexagonal-cell.structure';
import { HexagonalCellError } from './hexagonal-cell.error';
import { HexagonalCellDirectionEnum } from './hexagonal-cell-direction.enum';

describe('HexagonalCellStructure', () => {
  test('HexagonalCell setCoordinates valid coordinates', () => {
    //given
    const land1 = new HexagonalCellStructure({ weight: 1 });
    //when
    land1.setCoordinates({ x: -4, y: 3, z: 1 });
    //then
    expect(land1.coordinates).toStrictEqual({ x: -4, y: 3, z: 1 });
  });

  test('HexagonalCell setCoordinates invalid coordinates', () => {
    //given
    const land1 = new HexagonalCellStructure({ weight: 1 });
    //when and then
    expect(() => land1.setCoordinates({ x: -4, y: -4, z: 1 })).toThrow(
      HexagonalCellError.invalidCoordinatesErrorMessage
    );
  });

  test('HexagonalCell setCoordinatesAdjacentTo TOP LEFT', () => {
    //given
    const land = new HexagonalCellStructure({ weight: 1 });
    const landPlaced = new HexagonalCellStructure({ weight: 2 });
    landPlaced.setCoordinates({ x: 0, y: 0, z: 0 });
    //when
    land.setCoordinatesAdjacentTo(landPlaced, HexagonalCellDirectionEnum.TOP_LEFT);
    //then
    expect(land.coordinates).toStrictEqual({ x: 0, y: -1, z: 1 });
  });

  test('HexagonalCell setCoordinatesAdjacentTo TOP RIGHT', () => {
    //given
    const land = new HexagonalCellStructure({ weight: 1 });
    const landPlaced = new HexagonalCellStructure({ weight: 2 });
    landPlaced.setCoordinates({ x: 0, y: 0, z: 0 });
    //when
    land.setCoordinatesAdjacentTo(landPlaced, HexagonalCellDirectionEnum.TOP_RIGHT);
    //then
    expect(land.coordinates).toStrictEqual({ x: 1, y: -1, z: 0 });
  });

  test('HexagonalCell setCoordinatesAdjacentTo BOT LEFT', () => {
    //given
    const land = new HexagonalCellStructure({ weight: 1 });
    const landPlaced = new HexagonalCellStructure({ weight: 2 });
    landPlaced.setCoordinates({ x: 0, y: 0, z: 0 });
    //when
    land.setCoordinatesAdjacentTo(landPlaced, HexagonalCellDirectionEnum.BOTTOM_LEFT);
    //then
    expect(land.coordinates).toStrictEqual({ x: -1, y: 1, z: 0 });
  });

  test('HexagonalCell setCoordinatesAdjacentTo BOT RIGHT', () => {
    //given
    const land = new HexagonalCellStructure({ weight: 1 });
    const landPlaced = new HexagonalCellStructure({ weight: 2 });
    landPlaced.setCoordinates({ x: 0, y: 0, z: 0 });
    //when
    land.setCoordinatesAdjacentTo(landPlaced, HexagonalCellDirectionEnum.BOTTOM_RIGHT);
    //then
    expect(land.coordinates).toStrictEqual({ x: 0, y: 1, z: -1 });
  });

  test('HexagonalCell setCoordinatesAdjacentTo LEFT', () => {
    //given
    const land = new HexagonalCellStructure({ weight: 1 });
    const landPlaced = new HexagonalCellStructure({ weight: 2 });
    landPlaced.setCoordinates({ x: 0, y: 0, z: 0 });
    //when
    land.setCoordinatesAdjacentTo(landPlaced, HexagonalCellDirectionEnum.LEFT);
    //then
    expect(land.coordinates).toStrictEqual({ x: -1, y: 0, z: 1 });
  });

  test('HexagonalCell setCoordinatesAdjacentTo RIGHT', () => {
    //given
    const land = new HexagonalCellStructure({ weight: 1 });
    const landPlaced = new HexagonalCellStructure({ weight: 2 });
    landPlaced.setCoordinates({ x: 0, y: 0, z: 0 });
    //when
    land.setCoordinatesAdjacentTo(landPlaced, HexagonalCellDirectionEnum.RIGHT);
    //then
    expect(land.coordinates).toStrictEqual({ x: 1, y: 0, z: -1 });
  });

  test('HexagonalCell isLocatedAt same locations', () => {
    //given
    const land1 = new HexagonalCellStructure({ weight: 1 });
    const coords = { x: -4, y: 3, z: 1 };
    land1.setCoordinates({ x: -4, y: 3, z: 1 });
    //when
    const result = land1.isLocatedAt(coords);
    //then
    expect(result).toBe(true);
  });

  test('HexagonalCell isLocatedAt different locations', () => {
    //given
    const land1 = new HexagonalCellStructure({ weight: 1 });
    const coords = { x: -4, y: 3, z: 1 };
    land1.setCoordinates({ x: -4, y: 3, z: 1 });
    //when
    const result = land1.isLocatedAt(coords);
    //then
    expect(result).toBe(true);
  });

  test('HexagonalCell hasSameLocationWith same locations', () => {
    //given
    const land1 = new HexagonalCellStructure({ weight: 1 });
    const land1SameCoordinates = new HexagonalCellStructure({ weight: 8 });
    land1.setCoordinates({ x: -4, y: 3, z: 1 });
    land1SameCoordinates.setCoordinates({ x: -4, y: 3, z: 1 });
    //when
    const result = land1.hasSameLocationWith(land1SameCoordinates);
    //then
    expect(result).toBe(true);
  });

  test('HexagonalCell hasSameLocationWith different locations', () => {
    //given
    const land1 = new HexagonalCellStructure({ weight: 1 });
    const land1SameCoordinates = new HexagonalCellStructure({ weight: 8 });
    land1.setCoordinates({ x: -4, y: 3, z: 1 });
    land1SameCoordinates.setCoordinates({ x: -4, y: 2, z: 2 });
    //when
    const result = land1.hasSameLocationWith(land1SameCoordinates);
    //then
    expect(result).toBe(false);
  });

  test('HexagonalCell isAdjacentTo true and commutative', () => {
    //given
    const land1 = new HexagonalCellStructure({ weight: 1 });
    const land1Adjacent = new HexagonalCellStructure({ weight: 8 });
    land1.setCoordinates({ x: 3, y: 1, z: -4 });
    //when
    land1Adjacent.setCoordinates({ x: 3, y: 0, z: -3 });
    //then
    expect(land1.isAdjacentTo(land1Adjacent)).toBe(true);
    expect(land1Adjacent.isAdjacentTo(land1)).toBe(true);
  });

  test('HexagonalCell isAdjacentTo false and commutative', () => {
    //given
    const land1 = new HexagonalCellStructure({ weight: 1 });
    const land1Adjacent = new HexagonalCellStructure({ weight: 8 });
    land1.setCoordinates({ x: 3, y: 1, z: -4 });
    //when
    land1Adjacent.setCoordinates({ x: 1, y: 1, z: -2 });
    //then
    expect(land1.isAdjacentTo(land1Adjacent)).toBe(false);
    expect(land1Adjacent.isAdjacentTo(land1)).toBe(false);
  });

  test('HexagonalCell distanceFrom is commutative', () => {
    //given
    const land1 = new HexagonalCellStructure({ weight: 1 });
    const land2 = new HexagonalCellStructure({ weight: 8 });
    //when
    land1.setCoordinates({ x: -1, y: 0, z: 1 });
    land2.setCoordinates({ x: 3, y: 0, z: -3 });
    const expectedResult = Math.sqrt(Math.pow(-1 - 3, 2) + Math.pow(1 - -3, 2));
    //then
    expect(land1.euclideanDistanceFrom(land2)).toBe(expectedResult);
    expect(land2.euclideanDistanceFrom(land1)).toBe(expectedResult);
  });

  test('HexagonalCell hasSameItem is true and commutative', () => {
    //given
    const land1 = new HexagonalCellStructure({ weight: 3 });
    const land2 = new HexagonalCellStructure({ weight: 3 });
    //then
    expect(land1.hasSameItem(land2)).toBe(true);
    expect(land2.hasSameItem(land1)).toBe(true);
  });

  test('HexagonalCell hasSameItem is false and commutative', () => {
    //given
    const land1 = new HexagonalCellStructure({ weight: 1 });
    const land2 = new HexagonalCellStructure({ weight: 8 });
    //then
    expect(land1.hasSameItem(land2)).toBe(false);
    expect(land2.hasSameItem(land1)).toBe(false);
  });

  test('HexagonalCell getItemOrThrow gets the item', () => {
    //given
    const land1 = new HexagonalCellStructure({ weight: 1 });
    //then
    expect(land1.getItemOrThrow()).toStrictEqual({ weight: 1 });
  });

  test('HexagonalCell getItemOrThrow throws an error', () => {
    //given
    const land1 = new HexagonalCellStructure();
    //then
    expect(() => land1.getItemOrThrow()).toThrow(HexagonalCellError.noItemErrorMessage);
  });

  test('HexagonalCell getItemOrDefault gets the item', () => {
    //given
    const land1 = new HexagonalCellStructure({ weight: 1 });
    //then
    expect(land1.getItemOrDefault({ weight: 5 })).toStrictEqual({ weight: 1 });
  });

  test('HexagonalCell getItemOrDefault gets the default', () => {
    //given
    const land1 = new HexagonalCellStructure();
    //then
    expect(land1.getItemOrDefault({ weight: 5 })).toStrictEqual({ weight: 5 });
  });

  test('HexagonalCell hasItem has an item', () => {
    //given
    const land1 = new HexagonalCellStructure({ weight: 1 });
    //then
    expect(land1.hasItem()).toBe(true);
  });

  test('HexagonalCell hasItem has no item', () => {
    //given
    const land1 = new HexagonalCellStructure();
    //then
    expect(land1.hasItem()).toBe(false);
  });
});
