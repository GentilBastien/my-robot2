import { RequestEvent } from '@events/request.event';
import { EventContext } from '@events/context.event';
import { ManaResponseEvent } from '@events/mana/mana.response-event';

export class ManaRequestEvent implements RequestEvent {
  sourceRobotId: string;
  value: number;

  public mapToResponse(_context: EventContext): ManaResponseEvent {
    return new ManaResponseEvent({
      sourceRobotId: this.sourceRobotId,
      responseValidated: true,
      value: this.value,
    });
  }

  public constructor(sourceRobotId: string, value: number) {
    this.sourceRobotId = sourceRobotId;
    this.value = value;
  }
}
