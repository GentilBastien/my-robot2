import { HexagonalCellStructureInterface } from './hexagonal-cell.structure-interface';
import { HexagonalCellDirectionEnum } from './hexagonal-cell-direction.enum';
import { HexagonalCellError } from './hexagonal-cell.error';
import { Coordinates, EqualsUtils, Weight } from 'shared';

export class HexagonalCellStructure<T extends Weight> implements HexagonalCellStructureInterface<T> {
  _item: T | null;
  _x: number = 0;
  _y: number = 0;
  _z: number = 0;

  constructor(item?: T | null) {
    this._item = item ?? null;
  }

  public get x(): number {
    return this._x;
  }

  public get y(): number {
    return this._y;
  }

  public get z(): number {
    return this._z;
  }

  public get coordinates(): Coordinates {
    return {
      x: this._x,
      y: this._y,
      z: this._z,
    };
  }

  public weight(): number {
    return this._item?.weight ?? 0;
  }

  public setCoordinates(coordinates: Coordinates): void {
    if (coordinates.x + coordinates.y + coordinates.z !== 0) {
      throw HexagonalCellError.invalidCoordinatesError;
    }
    this._x = coordinates.x;
    this._y = coordinates.y;
    this._z = coordinates.z;
  }

  public setCoordinatesAdjacentTo(otherCell: HexagonalCellStructure<T>, direction: HexagonalCellDirectionEnum): void {
    switch (direction) {
      case HexagonalCellDirectionEnum.RIGHT:
        this._x = otherCell._x + 1;
        this._y = otherCell._y;
        this._z = otherCell._z - 1;
        break;
      case HexagonalCellDirectionEnum.LEFT:
        this._x = otherCell._x - 1;
        this._y = otherCell._y;
        this._z = otherCell._z + 1;
        break;
      case HexagonalCellDirectionEnum.BOTTOM_LEFT:
        this._x = otherCell._x - 1;
        this._y = otherCell._y + 1;
        this._z = otherCell._z;
        break;
      case HexagonalCellDirectionEnum.BOTTOM_RIGHT:
        this._x = otherCell._x;
        this._y = otherCell._y + 1;
        this._z = otherCell._z - 1;
        break;
      case HexagonalCellDirectionEnum.TOP_LEFT:
        this._x = otherCell._x;
        this._y = otherCell._y - 1;
        this._z = otherCell._z + 1;
        break;
      case HexagonalCellDirectionEnum.TOP_RIGHT:
        this._x = otherCell._x + 1;
        this._y = otherCell._y - 1;
        this._z = otherCell._z;
        break;
    }
  }

  public hasSameLocationWith(otherCell: HexagonalCellStructure<T>): boolean {
    return this._x === otherCell._x && this._y === otherCell._y && this._z === otherCell._z;
  }

  public isAdjacentTo(otherCell: HexagonalCellStructure<T>): boolean {
    return Math.abs(this._x - otherCell._x) + Math.abs(this._y - otherCell._y) + Math.abs(this._z - otherCell._z) === 2;
  }

  public euclideanDistanceFrom(otherCell: HexagonalCellStructure<T>): number {
    return Math.sqrt(
      Math.pow(this._x - otherCell._x, 2) + Math.pow(this._y - otherCell._y, 2) + Math.pow(this._z - otherCell._z, 2)
    );
  }

  public hasSameItem(otherCell: HexagonalCellStructure<T>): boolean {
    return EqualsUtils.deepEquals(this._item, otherCell._item);
  }

  public getItemOrThrow(): T {
    if (this._item) {
      return this._item;
    }
    throw HexagonalCellError.noItemError;
  }

  public getItemOrDefault(defaultItem: T): T {
    if (this._item) {
      return this._item;
    }
    return defaultItem;
  }

  public hasItem(): boolean {
    return this._item !== null;
  }
}
