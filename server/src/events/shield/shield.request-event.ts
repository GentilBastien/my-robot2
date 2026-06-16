import { RequestEvent } from '@events/request.event';
import { ContextEvent } from '@events/context.event';
import { ShieldResponseEvent } from '@events/shield/shield.response-event';

export class ShieldRequestEvent implements RequestEvent {
  sourceRobotId: string;
  value: number;

  public mapToResponse(_context: ContextEvent): ShieldResponseEvent {
    return new ShieldResponseEvent({
      sourceRobotId: this.sourceRobotId,
      responseValidated: true,
      value: this.value,
    });
  }

  constructor(sourceRobotId: string, value: number) {
    this.sourceRobotId = sourceRobotId;
    this.value = value;
  }
}
