import { RequestEvent } from '@events/request.event';
import { EventContext } from '@events/context.event';
import { HeatResponseEvent } from '@events/heat/heat.response-event';

export class HeatRequestEvent implements RequestEvent {
  sourceRobotId: string;
  value: number;

  public constructor(sourceRobotId: string, value: number) {
    this.sourceRobotId = sourceRobotId;
    this.value = value;
  }

  public mapToResponse(_context: EventContext): HeatResponseEvent {
    return new HeatResponseEvent({
      sourceRobotId: this.sourceRobotId,
      responseValidated: true,
      value: this.value,
    });
  }
}
