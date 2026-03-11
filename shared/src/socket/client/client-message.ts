import { MessageType } from '../message.type';

export interface ClientMessage {
  login: string;
  type: MessageType;
  payload: Record<string, string>;
}
