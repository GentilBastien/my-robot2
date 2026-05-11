import { RequestEvent } from '@events/request.event';
import { ContextEvent } from '@events/context.event';
import { HpResponseEvent } from '@events/hp/hp.response-event';

export class HpRequestEvent implements RequestEvent {
  sourceRobotId: string;
  value: number;

  public mapToResponse(_context: ContextEvent): HpResponseEvent {
    return new HpResponseEvent({
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
