import { ContextEvent } from '@events/context.event';
import { ResponseEvent } from '@events/response.event';
import { Coordinate, MaybeArray, Reducer } from 'shared';
import { updateCoordinates } from '@reducers/robot.reducer';
import { CellCalculator } from '@calculators/cell.calculator';
import { updateVision } from '@reducers/vision.reducer';

export class MovementResponseEvent implements ResponseEvent {
  sourceRobotId: string;
  responseValidated: boolean;
  coordinates: Coordinate;

  public constructor(parameters: { sourceRobotId: string; responseValidated: boolean; coordinates: Coordinate }) {
    this.sourceRobotId = parameters.sourceRobotId;
    this.responseValidated = parameters.responseValidated;
    this.coordinates = parameters.coordinates;
  }

  public mapToReducer(context: ContextEvent): MaybeArray<Reducer> {
    const updateCoordinatesReducer: Reducer = updateCoordinates(this.sourceRobotId, this.coordinates);
    const newVisibleCells: string[] = CellCalculator.getVisibleCells(context, this.sourceRobotId);
    const visionReducer: Reducer = updateVision(this.sourceRobotId, newVisibleCells);
    return [updateCoordinatesReducer, visionReducer];
  }
}
