import { ContextEvent } from '@events/context.event';
import { MaybeArray, Reducer } from 'shared';
import { SourceEvent } from '@events/source.event';

export interface ResponseEvent extends SourceEvent {
  responseValidated: boolean;
  mapToReducer(context: ContextEvent): MaybeArray<Reducer>;
}
