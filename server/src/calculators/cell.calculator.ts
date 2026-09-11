import {
  CellState,
  Coordinate,
  MovementTypeEnum,
  PathCostCoordinate,
  RobotState,
  StepPathCostCoordinate,
} from 'shared';
import { EventContext } from '@events/context.event';
import { RobotCalculator } from '@calculators/robot.calculator';
import { Action } from '@entities/actions/action';
import { HexagonalCellStructure } from '@structures/hexagonal-cell/hexagonal-cell.structure';

export class CellCalculator {
  public static getCellState(context: EventContext, cellId: string): CellState {
    return context.gameState.arenaState.cells[cellId];
  }

  public static getCellAt(context: EventContext, coordinates: Coordinate): HexagonalCellStructure<CellState> {
    return context.gameStateHandler.hexagonalGridState.getCellAt(coordinates);
  }

  public static hasEnoughRangeForRobotTarget(
    context: EventContext,
    sourceRobotId: string,
    targetRobotId: string,
    action: Action
  ): boolean {
    const sourceRobotCoordinates = RobotCalculator.getRobotCoordinates(context, sourceRobotId);
    const targetRobotCoordinates = RobotCalculator.getRobotCoordinates(context, targetRobotId);
    const sourceHexCell = CellCalculator.getCellAt(context, sourceRobotCoordinates);
    const targetHexCell = CellCalculator.getCellAt(context, targetRobotCoordinates);
    return context.gameStateHandler.hexagonalGridState.isCellInRange(sourceHexCell, action.range, targetHexCell);
  }

  public static hasEnoughRangeForCoordinateTarget(
    context: EventContext,
    sourceRobotId: string,
    targetCellCoordinate: Coordinate,
    action: Action
  ): boolean {
    const sourceRobotCoordinates = RobotCalculator.getRobotCoordinates(context, sourceRobotId);
    const sourceHexCell = CellCalculator.getCellAt(context, sourceRobotCoordinates);
    const targetHexCell = CellCalculator.getCellAt(context, targetCellCoordinate);
    return context.gameStateHandler.hexagonalGridState.isCellInRange(sourceHexCell, action.range, targetHexCell);
  }

  public static getShortestPathTo(
    context: EventContext,
    robotId: string,
    target: Coordinate
  ): PathCostCoordinate | null {
    const robotCoordinates = RobotCalculator.getRobotCoordinates(context, robotId);
    const startCell = CellCalculator.getCellAt(context, robotCoordinates);
    const targetCell = CellCalculator.getCellAt(context, target);
    return context.gameStateHandler.hexagonalGridState.shortestPathTo(startCell, targetCell);
  }

  public static getPossiblePaths(context: EventContext, robotId: string): PathCostCoordinate[] {
    const robotRemainingMove = RobotCalculator.getRobotState(context, robotId).resources.remainingMove;
    const robotCoordinates = RobotCalculator.getRobotCoordinates(context, robotId);
    const robotCell = CellCalculator.getCellAt(context, robotCoordinates);
    return context.gameStateHandler.hexagonalGridState.possiblePaths(robotCell, robotRemainingMove);
  }

  public static getCellStateAtCoordinates(context: EventContext, coordinates: Coordinate): CellState {
    return CellCalculator.getCellAt(context, coordinates).item;
  }

  public static mapPathToPathWithCost(context: EventContext, path: Coordinate[]): PathCostCoordinate {
    const hexCells = path.map(coordinates => CellCalculator.getCellAt(context, coordinates));
    return {
      costs: hexCells.map(hexCell => hexCell.weight),
      coordinatesPath: path,
    };
  }

  public static checkPathIsValid(
    context: EventContext,
    robotId: string,
    path: Coordinate[],
    movementType: MovementTypeEnum
  ): boolean {
    const robotCoordinates = RobotCalculator.getRobotCoordinates(context, robotId);
    const robotCell = CellCalculator.getCellAt(context, robotCoordinates);

    /**
     * Check if coordinates are valid : sum of x, y, z is 0 and are not outside the grid.
     */
    if (path.some(p => !CellCalculator.checkCoordinateIsValid(context, p))) {
      return false;
    }

    const hexCells = path.map(coordinates => CellCalculator.getCellAt(context, coordinates));

    /**
     * Check that path is not empty.
     */
    if (path.length === 0) {
      return false;
    }

    /**
     * Check that path starts from robot location.
     */
    if (!robotCell.isLocatedAt(path[0])) {
      return false;
    }

    /**
     * If a teleportation or a jump, check there is only 2 different coordinates (takeoff and landing)
     */
    if (movementType === MovementTypeEnum.JUMPED || movementType === MovementTypeEnum.TELEPORTED) {
      if (hexCells.length !== 2 || hexCells[0].isLocatedAt(hexCells[1])) {
        return false;
      }
    } else {
      /**
       * Else, check that every coordinate are adjacent
       */
      for (let i = 0; i < hexCells.length; i++) {
        if (hexCells[i + 1] && !hexCells[i].isAdjacentTo(hexCells[i + 1])) {
          return false;
        }
      }
    }

    return path.length > 1;
  }

  public static checkCoordinateIsValid(context: EventContext, coordinates: Coordinate): boolean {
    try {
      CellCalculator.getCellAt(context, coordinates);
      return true;
    } catch {
      return false;
    }
  }

  public static getPathCoordinateCost(pathCoordinate: PathCostCoordinate): number {
    let sum = 0;
    //skip first because no initial cost
    for (let i = 1; i < pathCoordinate.costs.length; i++) {
      sum += pathCoordinate.costs[i];
    }
    return sum;
  }

  public static getAffectedRobotsByRadius(context: EventContext, origin: Coordinate, radius: number): RobotState[] {
    const originCell = context.gameStateHandler.hexagonalGridState.getCellAt(origin);
    const area = context.gameStateHandler.hexagonalGridState.getCellsInRange(originCell, radius, true);
    return Object.values(context.gameState.robots).filter(robotState =>
      area.some(cell => cell.isLocatedAt(robotState.coordinates))
    );
  }

  /**
   * Loop through all the possible sources of visibility and get the visible cells and flat them with no duplicates.
   */
  public static getVisibleCells(context: EventContext, robotId: string): string[] {
    const proximityVision = CellCalculator.getVisibleCellsByProximity(context, robotId);
    const droidProbeVision = CellCalculator.getVisibleCellsFromDroidProbe();
    const allVisibilityCells = [proximityVision, droidProbeVision].flat();
    return Array.from(new Set<string>(allVisibilityCells));
  }

  public static getVisibleCellsByProximity(context: EventContext, robotId: string): string[] {
    const robotHexCell = CellCalculator.getCellAt(context, RobotCalculator.getRobotCoordinates(context, robotId));
    const robotVisionHexCells = context.gameStateHandler.hexagonalGridState.getCellsInRange(robotHexCell, 2);
    return robotVisionHexCells.map(hexCell => hexCell.item.id);
  }

  public static getVisibleCellsFromDroidProbe(): string[] {
    return [];
  }

  public static splitPathInSteps(path: PathCostCoordinate): StepPathCostCoordinate[] {
    if (path.coordinatesPath.length <= 1 || path.costs.length <= 1) {
      return [];
    }
    //Slice to remove the last item in loop.
    return path.coordinatesPath.slice(0, -1).map((startCoordinates, i) => ({
      startCoordinates,
      endCoordinates: path.coordinatesPath[i + 1],
      cost: path.costs[i + 1],
    }));
  }
}
