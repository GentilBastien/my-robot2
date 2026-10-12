import { RequestEvent } from '@events/request.event';
import { EventContext } from '@events/context.event';
import { ResourcesResponseEvent } from '@events/system/resources/resources.response-event';

export class ResourcesRequestEvent implements RequestEvent {
  sourceRobotId: string;

  constructor(sourceRobotId: string) {
    this.sourceRobotId = sourceRobotId;
  }

  public resolve(_context: EventContext): ResourcesResponseEvent {
    return new ResourcesResponseEvent({ sourceRobotId: this.sourceRobotId, responseValidated: true });
  }
}
