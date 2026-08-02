import { ResponseEvent } from '@events/response.event';
import { ContextEvent } from '@events/context.event';

export interface RequestEvent {
  readonly sourceRobotId: string;
  mapToResponse(context: ContextEvent): ResponseEvent;
}
