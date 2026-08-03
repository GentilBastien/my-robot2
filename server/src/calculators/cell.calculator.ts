import { CellState, Coordinate, MovementTypeEnum, PathCostCoordinate, StepPathCostCoordinate } from 'shared';
import { ContextEvent } from '@events/context.event';
import { RobotCalculator } from '@calculators/robot.calculator';
import { Action } from '@entities/actions/action';

export class CellCalculator {
  public static getCellState(context: ContextEvent, cellId: string): CellState {
    return context.gameState.arenaState.cells[cellId];
  }

  public static hasEnoughRangeForRobotTarget(
    context: ContextEvent,
    sourceRobotId: string,
    targetRobotId: string,
    action: Action
  ): boolean {
    const sourceRobotCoordinates = RobotCalculator.getRobotCoordinates(context, sourceRobotId);
    const targetRobotCoordinates = RobotCalculator.getRobotCoordinates(context, targetRobotId);
    const sourceHexCell = context.gameStateHandler.hexagonalGridState.getCellAt(sourceRobotCoordinates);
    const targetHexCell = context.gameStateHandler.hexagonalGridState.getCellAt(targetRobotCoordinates);
    return context.gameStateHandler.hexagonalGridState.isCellInRange(sourceHexCell, action.range, targetHexCell);
  }

  public static hasEnoughRangeForCoordinateTarget(
    context: ContextEvent,
    sourceRobotId: string,
    targetCellCoordinate: Coordinate,
    action: Action
  ): boolean {
    const sourceRobotCoordinates = RobotCalculator.getRobotCoordinates(context, sourceRobotId);
    const sourceHexCell = context.gameStateHandler.hexagonalGridState.getCellAt(sourceRobotCoordinates);
    const targetHexCell = context.gameStateHandler.hexagonalGridState.getCellAt(targetCellCoordinate);
    return context.gameStateHandler.hexagonalGridState.isCellInRange(sourceHexCell, action.range, targetHexCell);
  }

  public static getShortestPathTo(
    context: ContextEvent,
    robotId: string,
    target: Coordinate
  ): PathCostCoordinate | null {
    const robotCoordinates = RobotCalculator.getRobotCoordinates(context, robotId);
    const startCell = context.gameStateHandler.hexagonalGridState.getCellAt(robotCoordinates);
    const targetCell = context.gameStateHandler.hexagonalGridState.getCellAt(target);
    return context.gameStateHandler.hexagonalGridState.shortestPathTo(startCell, targetCell);
  }

  public static getPossiblePaths(context: ContextEvent, robotId: string): PathCostCoordinate[] {
    const robotRemainingMove = RobotCalculator.getRobotState(context, robotId).resources.remainingMove;
    const robotCoordinates = RobotCalculator.getRobotCoordinates(context, robotId);
    const robotCell = context.gameStateHandler.hexagonalGridState.getCellAt(robotCoordinates);
    return context.gameStateHandler.hexagonalGridState.possiblePaths(robotCell, robotRemainingMove);
  }

  public static getCellStateAtCoordinates(context: ContextEvent, coordinates: Coordinate): CellState {
    return context.gameStateHandler.hexagonalGridState.getCellAt(coordinates).item;
  }

  public static mapPathToPathWithCost(context: ContextEvent, path: Coordinate[]): PathCostCoordinate {
    const hexCells = path.map(coordinates => context.gameStateHandler.hexagonalGridState.getCellAt(coordinates));
    return {
      costs: hexCells.map(hexCell => hexCell.weight),
      coordinatesPath: path,
    };
  }

  public static checkPathIsValid(
    context: ContextEvent,
    robotId: string,
    path: Coordinate[],
    movementType: MovementTypeEnum
  ): boolean {
    const robotCoordinates = RobotCalculator.getRobotCoordinates(context, robotId);
    if (path.some(p => !CellCalculator.checkCoordinateIsValid(context, p))) {
      return false;
    }
    const hexCells = path.map(coordinates => context.gameStateHandler.hexagonalGridState.getCellAt(coordinates));
    if (path.length === 0) {
      return false;
    }
    if (movementType === MovementTypeEnum.JUMPED || movementType === MovementTypeEnum.TELEPORTED) {
      if (hexCells.length !== 2) {
        return false;
      }
    }
    for (let i = 0; i < hexCells.length; i++) {
      if (!hexCells[i].isAdjacentTo(hexCells[i + 1])) {
        return false;
      }
    }
    return (
      path.length > 1 ||
      (path.length === 2 &&
        !context.gameStateHandler.hexagonalGridState.getCellAt(robotCoordinates).isLocatedAt(path[0]))
    );
  }

  public static checkCoordinateIsValid(context: ContextEvent, coordinates: Coordinate): boolean {
    try {
      context.gameStateHandler.hexagonalGridState.getCellAt(coordinates);
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

  /**
   * Loop through all the possible sources of visibility and get the visible cells and flat them with no duplicates.
   */
  public static getVisibleCells(context: ContextEvent, robotId: string): string[] {
    const proximityVision = CellCalculator.getVisibleCellsByProximity(context, robotId);
    const droidProbeVision = CellCalculator.getVisibleCellsFromDroidProbe();
    const allVisibilityCells = [proximityVision, droidProbeVision].flat();
    return Array.from(new Set<string>(allVisibilityCells));
  }

  public static getVisibleCellsByProximity(context: ContextEvent, robotId: string): string[] {
    const robotHexCell = context.gameStateHandler.hexagonalGridState.getCellAt(
      RobotCalculator.getRobotCoordinates(context, robotId)
    );
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
