import { MessageType } from '../../message.type';
import { GameEvent } from './game.event';

export interface ClientMessage {
  login: string;
  type: MessageType;
  payload: Record<string, string> | GameEvent;
}
