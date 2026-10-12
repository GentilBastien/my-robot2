import { EventContext } from '@events/context.event';
import { MaybeArray, Reducer } from 'shared';

export interface ResponseEvent {
  readonly responseValidated: boolean;
  apply(context: EventContext): MaybeArray<Reducer>;
}
