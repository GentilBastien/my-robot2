import { EventContext } from '@events/context.event';
import { CellCalculator } from '@calculators/cell.calculator';
import { RobotCalculator } from '@calculators/robot.calculator';
import { Coordinate } from 'shared';

export class VisionCalculator {
  /**
   * Loop through all the possible sources of visibility and get the visible cells and flat them with no duplicates.
   */
  public static getVisibleCells(context: EventContext, robotId: string): string[] {
    const proximityVision = VisionCalculator.getVisibleCellsByProximity(context, robotId);
    const droidProbeVision = VisionCalculator.getVisibleCellsFromDroidProbe();
    const allVisibilityCells = [proximityVision, droidProbeVision].flat();
    return Array.from(new Set<string>(allVisibilityCells));
  }

  public static getVisibleCellsByProximity(context: EventContext, robotId: string): string[] {
    const robotState = RobotCalculator.getRobotState(context, robotId);
    const robotHexCell = CellCalculator.getCellAt(context, robotState.coordinates);
    const robotVisionHexCells = context.gameStateHandler.hexagonalGridState.getCellsInRange(
      robotHexCell,
      robotState.visionRange
    );
    return robotVisionHexCells.map(hexCell => hexCell.item.id);
  }

  public static getVisibleCellsFromDroidProbe(): string[] {
    return [];
  }

  public static hasVision(context: EventContext, robotId: string, coordinate: Coordinate): boolean {
    const robotState = RobotCalculator.getRobotState(context, robotId);
    const robotCell = CellCalculator.getCellAt(context, robotState.coordinates);
    const visionCell = context.gameStateHandler.hexagonalGridState.getCellAt(coordinate);
    return context.gameStateHandler.hexagonalGridState.isCellInRange(robotCell, robotState.visionRange, visionCell);
  }
}
