import { ResponseEvent } from '@events/response.event';
import { EventContext } from '@events/context.event';

export interface RequestEvent {
  readonly sourceRobotId: string;
  resolve(context: EventContext): ResponseEvent;
}
