import { RequestEvent } from '@events/request.event';
import { ContextEvent } from '@events/context.event';
import { ResourcesResponseEvent } from '@events/resources/resources.response-event';

export class ResourcesRequestEvent implements RequestEvent {
  sourceRobotId: string;

  constructor(sourceRobotId: string) {
    this.sourceRobotId = sourceRobotId;
  }

  public mapToResponse(_context: ContextEvent): ResourcesResponseEvent {
    return new ResourcesResponseEvent({ sourceRobotId: this.sourceRobotId, responseValidated: true });
  }
}
