import { ContextEvent } from '@events/context.event';
import { ResponseEvent } from '@events/response.event';
import { MaybeArray, Reducer } from 'shared';

export class ActionResponseEvent implements ResponseEvent {
  responseValidated = true;
  mapToReducer(context: ContextEvent): MaybeArray<Reducer> {
    throw new Error('Method not implemented.');
  }
}
