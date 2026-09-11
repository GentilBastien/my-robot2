import { EventContext } from '@events/context.event';
import { MaybeArray, Reducer } from 'shared';

export interface ResponseEvent {
  readonly responseValidated: boolean;
  mapToReducer(context: EventContext): MaybeArray<Reducer>;
}
