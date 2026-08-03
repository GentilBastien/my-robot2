import { RequestEvent } from '@events/request.event';
import { ContextEvent } from '@events/context.event';
import { MovementResponseEvent } from '@events/movement/movement.response-event';
import { Coordinate } from 'shared';

export class MovementRequestEvent implements RequestEvent {
  sourceRobotId: string;
  coordinates: Coordinate;

  constructor(sourceRobotId: string, coordinates: Coordinate) {
    this.sourceRobotId = sourceRobotId;
    this.coordinates = coordinates;
  }

  public mapToResponse(_context: ContextEvent): MovementResponseEvent {
    //TODO : DONT check the remainingMove, this is just a movement request, check if the coordinates are ok
    return new MovementResponseEvent({
      sourceRobotId: this.sourceRobotId,
      responseValidated: true,
      coordinates: this.coordinates,
    });
  }
}
