import { GameState } from '../../states/game.state';
import { MessageType } from '../message.type';

export interface ServerMessage<T> {
  login: string;
  type: MessageType;
  payload: T;
}

export interface ServerGameUpdate {
  gameState: GameState;
  responses: string[];
}
