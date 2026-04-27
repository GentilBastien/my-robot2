import WebSocket from 'ws';
import { SessionStateTypeEnum } from 'shared';

export interface Session {
  login: string;
  webSocket: WebSocket;
  state: SessionStateTypeEnum;
  proposalId?: string;
  gameId?: string;
  ping?: number;
}
