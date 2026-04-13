import { Comparator, Coordinates, PathCoordinate, Weight } from 'shared';
import { HexagonalGridStructureInterface } from '@structures/hexagonal-grid/hexagonal-grid.structure-interface';
import { HexagonalCellStructure } from '@structures/hexagonal-cell/hexagonal-cell.structure';
import { HexagonalGridError } from '@structures/hexagonal-grid/hexagonal-grid.error';
import { arrayHasDuplicates } from '@utils/array.utils';
import { PriorityListStructure } from '@structures/priority-list/priority-list.structure';
import { HexagonalCellDirectionEnum } from '@structures/hexagonal-cell/hexagonal-cell-direction.enum';

export class HexagonalGridStructure<T extends Weight> implements HexagonalGridStructureInterface<T> {
  private readonly _cells: HexagonalCellStructure<T>[];
  private readonly _width: number;
  private readonly _height: number;

  constructor(width: number, height: number, items?: T[]) {
    this._cells = [];
    this._width = width;
    this._height = height;
    this.setAllCellCoordinates(width, height);
    if (items) {
      this.setAllCellItems(items);
    }
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

  public isCellInRange(origin: HexagonalCellStructure<T>, range: number, target: HexagonalCellStructure<T>): boolean {
    return (
      Math.abs(origin.x - target.x) <= range &&
      Math.abs(origin.y - target.y) <= range &&
      Math.abs(origin.z - target.z) <= range
    );
  }

  public possiblePaths(start: HexagonalCellStructure<T>, maxCost: number): PathCoordinate[] {
    const visitedPaths: PathCoordinate[] = [];
    this.possibleTargets_NewMove(start, visitedPaths, -start.weight, maxCost);
    return visitedPaths.filter(
      path => !arrayHasDuplicates(path.coordinatesPath, cell => `${cell.x}.${cell.y}.${cell.z}`)
    );
  }

  public shortestPathTo(start: HexagonalCellStructure<T>, target: HexagonalCellStructure<T>): PathCoordinate | null {
    const cellWeightFromStartComparator: Comparator<HexagonalCellStructure<T>> = (
      cell1: HexagonalCellStructure<T>,
      cell2: HexagonalCellStructure<T>
    ): number => cell1.weightFromStart - cell2.weightFromStart;
    const openList = new PriorityListStructure<HexagonalCellStructure<T>>(cellWeightFromStartComparator);
    const closedList = new Set<HexagonalCellStructure<T>>();
    openList.add(start);
    while (openList.elements.length > 0) {
      const currentNode: HexagonalCellStructure<T> = openList.poll()!;
      closedList.add(currentNode);
      let adjacentCells: HexagonalCellStructure<T>[] = this.getCellsInRange(currentNode, 1, false);
      adjacentCells = adjacentCells.filter(voisin => !openList.includes(voisin) && !closedList.has(voisin));
      adjacentCells.forEach(voisin => {
        voisin.weightFromStart = currentNode.weightFromStart + voisin.weight;
        voisin.distanceFromTarget = voisin.euclideanDistanceFrom(target);
        voisin.travelSegments = currentNode.travelSegments + 1;
      });
      openList.addAll(adjacentCells);
    }
    let shortestPath: HexagonalCellStructure<T>[] = [];
    let currentNodePath = target;
    while (!currentNodePath.hasSameLocationWith(start)) {
      shortestPath.push(currentNodePath);
      let adjacentCells: HexagonalCellStructure<T>[] = this.getCellsInRange(currentNodePath, 1, false);
      adjacentCells = adjacentCells.filter(voisin => closedList.has(voisin));
      const tempList = new PriorityListStructure<HexagonalCellStructure<T>>(cellWeightFromStartComparator);
      tempList.addAll(adjacentCells);
      currentNodePath = tempList.elements[0];
      if (currentNodePath === undefined) {
        return null;
      }
      if (currentNodePath.hasSameLocationWith(start)) {
        shortestPath.push(currentNodePath);
        break;
      }
    }
    shortestPath = shortestPath.reverse();
    return {
      coordinatesPath: shortestPath.map(cell => cell.coordinates),
      costs: shortestPath.map(cell => cell.weight),
    };
  }

  private possibleTargets_NewMove(
    cellCandidate: HexagonalCellStructure<T>,
    visitedPaths: PathCoordinate[],
    costFromStart: number,
    maxCostFromStart: number,
    pathToCandidate?: PathCoordinate
  ): void {
    const costCandidate: number = costFromStart + cellCandidate.weight;
    if (costCandidate <= maxCostFromStart) {
      //candidate is valid, add it in the valid cells and check its adjacent cells.
      const basePath: Coordinates[] = pathToCandidate?.coordinatesPath ?? [];
      const baseCost: number[] = pathToCandidate?.costs ?? [];
      const path: PathCoordinate = {
        coordinatesPath: [...basePath, cellCandidate.coordinates],
        costs: [...baseCost, cellCandidate.weight],
      };
      visitedPaths.push(path);
      this.getCellsInRange(cellCandidate, 1, false).forEach(adjacentCell =>
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
