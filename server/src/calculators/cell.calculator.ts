import { CellState, Coordinates, PathCostCoordinate, StepPathCostCoordinate } from 'shared';
import { ContextEvent } from '@events/context.event';
import { RobotCalculator } from '@calculators/robot.calculator';
import { HexagonalCellStructure } from '@structures/hexagonal-cell/hexagonal-cell.structure';

export class CellCalculator {
  public static getShortestPathTo(
    context: ContextEvent,
    robotId: string,
    target: Coordinates
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

  public static getCellStateAtCoordinates(context: ContextEvent, coordinates: Coordinates): CellState {
    return context.gameStateHandler.hexagonalGridState.getCellAt(coordinates).item;
  }

  public static mapPathToPathWithCost(context: ContextEvent, path: Coordinates[]): PathCostCoordinate {
    const hexCells = path.map(coordinates => context.gameStateHandler.hexagonalGridState.getCellAt(coordinates));
    if (CellCalculator.checkPathIsValid(hexCells)) {
      throw new Error('Invalid path');
    }
    return {
      costs: hexCells.map(hexCell => hexCell.weight),
      coordinatesPath: path,
    };
  }

  private static checkPathIsValid(hexCells: HexagonalCellStructure<CellState>[]): boolean {
    for (let i = 0; i < hexCells.length; i++) {
      if (!hexCells[i].isAdjacentTo(hexCells[i + 1])) {
        return false;
      }
    }
    return true;
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
  public static getVisibleCells(context: ContextEvent, robotId: string): Set<string> {
    const proximityVision = CellCalculator.getVisibleCellsByProximity(context, robotId);
    const droidProbeVision = CellCalculator.getVisibleCellsFromDroidProbe();
    const allVisibilityCells = [proximityVision, droidProbeVision].flat();
    return new Set<string>(allVisibilityCells);
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

  /**
   * Returns true if the given path will actually result in a movement.
   * Moving to the same coordinate where the robot already is won't be considered as a movement.
   */
  public static pathResultsInMovement(context: ContextEvent, robotId: string, coordinates: Coordinates[]): boolean {
    if (coordinates.length === 0) {
      return false;
    }
    const robotCoordinates: Coordinates = RobotCalculator.getRobotCoordinates(context, robotId);
    return (
      coordinates.length > 1 ||
      !context.gameStateHandler.hexagonalGridState.getCellAt(robotCoordinates).isLocatedAt(coordinates[0])
    );
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
