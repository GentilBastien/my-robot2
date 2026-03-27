import { ClientMessageType } from './client-message.type';
import { GameEvent } from './game.event';

export interface ClientMessage<T extends GameEvent | Record<string, string>> {
  login: string;
  type: ClientMessageType;
  payload: T;
}
