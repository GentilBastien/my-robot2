import { ClientMessageType } from './client-message.type';

export interface ClientMessage<T extends Record<string, string | undefined>> {
  login: string;
  type: ClientMessageType;
  payload?: T;
}
