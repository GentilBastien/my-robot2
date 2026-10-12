import { RequestEvent } from '@events/request.event';
import { EventContext } from '@events/context.event';
import { HpResponseEvent } from '@events/system/hp/hp.response-event';

export class HpRequestEvent implements RequestEvent {
  sourceRobotId: string;
  value: number;

  public resolve(_context: EventContext): HpResponseEvent {
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
