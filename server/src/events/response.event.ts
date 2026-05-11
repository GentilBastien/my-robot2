import { ContextEvent } from '@events/context.event';
import { Reducer } from 'shared';

export interface ResponseEvent {
  sourceRobotId: string;
  responseValidated: boolean;
  mapToReducer(context: ContextEvent): Reducer | null;
}
