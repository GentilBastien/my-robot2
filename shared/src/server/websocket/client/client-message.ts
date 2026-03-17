import { MessageType } from './message.type';
import { GameEvent } from './game.event';

export interface ClientMessage<T extends GameEvent | Record<string, string>> {
  login: string;
  type: MessageType;
  payload: T;
}
