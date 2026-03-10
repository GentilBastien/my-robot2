import { MessageType } from '../message.type';

export interface ClientMessage<T> {
  login: string;
  type: MessageType;
  payload: T;
}
