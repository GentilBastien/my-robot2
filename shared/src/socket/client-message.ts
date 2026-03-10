import { ClientMessageType } from './client-message.type';

export interface ClientMessage<T> {
  login: string; //who
  type: ClientMessageType; //what type
  payload: T; //what content
}
