import { ResponseEvent } from '@events/response.event';
import { ContextEvent } from '@events/context.event';

export interface RequestEvent {
  sourceRobotId: string;
  mapToResponse(context: ContextEvent): ResponseEvent;
}
