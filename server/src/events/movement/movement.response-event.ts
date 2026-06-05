import { ContextEvent } from '@events/context.event';
import { ResponseEvent } from '@events/response.event';
import { Coordinates, MaybeArray, Reducer } from 'shared';
import { updateCoordinates } from '@reducers/robot.reducer';

export class MovementResponseEvent implements ResponseEvent {
  sourceRobotId: string;
  responseValidated: boolean;
  coordinates: Coordinates;

  public mapToReducer(_context: ContextEvent): MaybeArray<Reducer> {
    return updateCoordinates(this.sourceRobotId, this.coordinates);
  }

  public constructor(parameters: { sourceRobotId: string; responseValidated: boolean; coordinates: Coordinates }) {
    this.sourceRobotId = parameters.sourceRobotId;
    this.responseValidated = parameters.responseValidated;
    this.coordinates = parameters.coordinates;
  }
}
