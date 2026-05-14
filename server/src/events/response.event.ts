import { ContextEvent } from '@events/context.event';
import { Reducer } from 'shared';
import { SourceEvent } from '@events/source.event';

export interface ResponseEvent extends SourceEvent {
  responseValidated: boolean;
  mapToReducer(context: ContextEvent): Reducer | null;
}
