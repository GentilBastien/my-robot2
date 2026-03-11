import { WebSocket, WebSocketServer } from 'ws';
import { WebsocketManager } from './websocket.manager';
import { Server } from 'node:https';

const websocketManager = new WebsocketManager();

export function createWebsocketServer(server: Server) {
  const wss = new WebSocketServer({ server });

  wss.on('connection', (ws: WebSocket) => {
    ws.on('message', data => {
      websocketManager.handleClientMessage(ws, data);
    });
    ws.on('close', () => {
      websocketManager.unregister(ws);
    });
  });
  return websocketManager;
}
