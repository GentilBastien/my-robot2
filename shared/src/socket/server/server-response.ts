import { GameState } from '../../states/game.state';
import { MessageType } from '../message.type';

export interface ServerResponse {
  login: string;
  type: MessageType;
  code: number;
  payload: Record<string, string>;
}

export interface ServerGameUpdate {
  gameState: GameState;
  responses: string[];
}
