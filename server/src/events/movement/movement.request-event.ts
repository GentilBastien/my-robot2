import { RequestEvent } from '@events/request.event';
import { ContextEvent } from '@events/context.event';
import { MovementResponseEvent } from '@events/movement/movement.response-event';
import { Coordinates } from 'shared';

export class MovementRequestEvent implements RequestEvent {
  sourceRobotId: string;
  coordinates: Coordinates;

  constructor(sourceRobotId: string, coordinates: Coordinates) {
    this.sourceRobotId = sourceRobotId;
    this.coordinates = coordinates;
  }

  public mapToResponse(_context: ContextEvent): MovementResponseEvent {
    return new MovementResponseEvent({
      sourceRobotId: this.sourceRobotId,
      responseValidated: true,
      coordinates: this.coordinates,
    });
  }
}
