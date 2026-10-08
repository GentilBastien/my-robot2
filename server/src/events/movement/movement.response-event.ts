import { EventContext } from '@events/context.event';
import { ResponseEvent } from '@events/response.event';
import { Coordinate, MaybeArray, Reducer } from 'shared';
import { updateCoordinates } from '@reducers/robot.reducer';
import { updateVisionCells } from '@reducers/vision.reducer';
import { VisionCalculator } from '@calculators/vision.calculator';

export class MovementResponseEvent implements ResponseEvent {
  sourceRobotId: string;
  responseValidated: boolean;
  coordinates: Coordinate;

  public constructor(parameters: { sourceRobotId: string; responseValidated: boolean; coordinates: Coordinate }) {
    this.sourceRobotId = parameters.sourceRobotId;
    this.responseValidated = parameters.responseValidated;
    this.coordinates = parameters.coordinates;
  }

  public mapToReducer(context: EventContext): MaybeArray<Reducer> {
    const updateCoordinatesReducer: Reducer = updateCoordinates(this.sourceRobotId, this.coordinates);
    const newVisibleCells: string[] = VisionCalculator.getVisibleCells(context, this.sourceRobotId);
    const visionReducer: Reducer = updateVisionCells(this.sourceRobotId, newVisibleCells);
    return [updateCoordinatesReducer, visionReducer];
  }
}
