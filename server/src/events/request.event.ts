import { ResponseEvent } from '@events/response.event';
import { ContextEvent } from '@events/context.event';
import { SourceEvent } from '@events/source.event';

export interface RequestEvent extends SourceEvent {
  sourceRobotId: string;
  mapToResponse(context: ContextEvent): ResponseEvent;
}
