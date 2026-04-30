import { ServerMessageType } from './server-message.type';

export interface ServerMessage<T extends Record<string, string | undefined>> {
  type: ServerMessageType;
  payload?: T;
}
