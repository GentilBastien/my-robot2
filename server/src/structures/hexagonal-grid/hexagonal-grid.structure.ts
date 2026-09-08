import { Comparator, Coordinate, PathCostCoordinate, Weight } from 'shared';
import { HexagonalGridStructureInterface } from '@structures/hexagonal-grid/hexagonal-grid.structure-interface';
import { HexagonalCellStructure } from '@structures/hexagonal-cell/hexagonal-cell.structure';
import { HexagonalGridError } from '@structures/hexagonal-grid/hexagonal-grid.error';
import { PriorityListStructure } from '@structures/priority-list/priority-list.structure';
import { HexagonalCellDirectionEnum } from '@structures/hexagonal-cell/hexagonal-cell-direction.enum';

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

  public getCellAt(coordinates: Coordinate): HexagonalCellStructure<T> {
    if (coordinates.x > this._width - 1 || coordinates.y > this._height - 1) {
      throw HexagonalGridError.outOfBoundsCoordinatesError;
    }
    const found: HexagonalCellStructure<T> | undefined = this._cells.find(cell => cell.isLocatedAt(coordinates));
    if (!found) throw HexagonalGridError.noCellFoundError;
    return found;
  }

  public setCellAt(coordinates: Coordinate, item: T | null): T | null {
    if (coordinates.x > this._width - 1 || coordinates.y > this._height - 1) {
      throw HexagonalGridError.outOfBoundsCoordinatesError;
    }
    const found: HexagonalCellStructure<T> | undefined = this._cells.find(cell => cell.isLocatedAt(coordinates));
    if (!found) throw HexagonalGridError.noCellFoundError;
    let previousItem = null;
    if (found.hasItem()) {
      previousItem = found.item;
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

  public getCellsInRange(
    origin: HexagonalCellStructure<T>,
    radius: number,
    includeOrigin = true
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

  public getRange(start: HexagonalCellStructure<T>, target: HexagonalCellStructure<T>): number {
    const dx = Math.abs(start.x - target.x);
    const dy = Math.abs(start.y - target.y);
    const dz = Math.abs(start.z - target.z);
    return Math.max(dx, dy, dz);
  }

  public isCellInRange(origin: HexagonalCellStructure<T>, range: number, target: HexagonalCellStructure<T>): boolean {
    return (
      Math.abs(origin.x - target.x) <= range &&
      Math.abs(origin.y - target.y) <= range &&
      Math.abs(origin.z - target.z) <= range
    );
  }

  public possiblePaths(start: HexagonalCellStructure<T>, maxCost: number): PathCostCoordinate[] {
    const key = (c: Coordinate): string => `${c.x}.${c.y}.${c.z}`;

    const bestCost = new Map<string, number>();
    const bestPath = new Map<string, PathCostCoordinate>();

    // min-priority queue by accumulated cost
    const queue: { cell: HexagonalCellStructure<T>; cost: number; path: PathCostCoordinate }[] = [];

    const startPath: PathCostCoordinate = { coordinatesPath: [start.coordinates], costs: [start.weight] };
    bestCost.set(key(start.coordinates), 0);
    bestPath.set(key(start.coordinates), startPath);
    queue.push({ cell: start, cost: 0, path: startPath });

    while (queue.length > 0) {
      // pop cheapest (swap for a real heap if boards get large)
      queue.sort((a, b) => a.cost - b.cost);
      const { cell, cost, path } = queue.shift()!;

      // stale entry check
      if (cost > (bestCost.get(key(cell.coordinates)) ?? Number.MAX_VALUE)) continue;

      for (const neighbor of this.getCellsInRange(cell, 1, false)) {
        const nextCost = cost + neighbor.weight;
        if (nextCost > maxCost) continue;

        const nKey = key(neighbor.coordinates);
        if (nextCost < (bestCost.get(nKey) ?? Number.MAX_VALUE)) {
          const nextPath: PathCostCoordinate = {
            coordinatesPath: [...path.coordinatesPath, neighbor.coordinates],
            costs: [...path.costs, neighbor.weight],
          };
          bestCost.set(nKey, nextCost);
          bestPath.set(nKey, nextPath);
          queue.push({ cell: neighbor, cost: nextCost, path: nextPath });
        }
      }
    }

    return Array.from(bestPath.values());
  }

  public shortestPathTo(
    start: HexagonalCellStructure<T>,
    target: HexagonalCellStructure<T>
  ): PathCostCoordinate | null {
    const key = (hexCell: HexagonalCellStructure<T>): string =>
      `${hexCell.coordinates.x}.${hexCell.coordinates.y}.${hexCell.coordinates.z}`;

    const cost = new Map<string, number>();
    const cameFrom = new Map<string, HexagonalCellStructure<T>>();

    const comparator: Comparator<HexagonalCellStructure<T>> = (a, b) =>
      (cost.get(key(a)) ?? Number.MAX_VALUE) - (cost.get(key(b)) ?? Number.MAX_VALUE);

    const openList = new PriorityListStructure<HexagonalCellStructure<T>>(comparator);
    const closedList = new Set<string>();

    cost.set(key(start), 0);
    openList.add(start);

    while (openList.elements.length > 0) {
      const currentNode = openList.poll()!;
      const currentKey = key(currentNode);

      if (closedList.has(currentKey)) continue; // stale duplicate entry
      closedList.add(currentKey);

      if (currentNode.hasSameLocationWith(target)) break; // shortest cost to target is now final

      const currentCost = cost.get(currentKey)!;

      for (const neighbor of this.getCellsInRange(currentNode, 1, false)) {
        const nKey = key(neighbor);
        if (closedList.has(nKey)) continue;

        const tentativeCost = currentCost + neighbor.weight;
        if (tentativeCost < (cost.get(nKey) ?? Number.MAX_VALUE)) {
          cost.set(nKey, tentativeCost);
          cameFrom.set(nKey, currentNode);
          openList.add(neighbor); // re-add; stale copies are skipped above via closedList check
        }
      }
    }

    if (!cost.has(key(target))) return null; // unreachable

    // reconstruct path via cameFrom pointers
    const path: HexagonalCellStructure<T>[] = [];
    let node: HexagonalCellStructure<T> | undefined = target;
    while (node && !node.hasSameLocationWith(start)) {
      path.push(node);
      node = cameFrom.get(key(node));
    }
    if (!node) return null; // broken chain, shouldn't happen
    path.push(start);
    path.reverse();

    return {
      coordinatesPath: path.map(cell => cell.coordinates),
      costs: path.map(cell => cell.weight),
    };
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
