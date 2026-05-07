import { ServerMessageType } from './server-message.type';

export interface ServerMessage<T> {
  type: ServerMessageType;
  payload?: T;
}
