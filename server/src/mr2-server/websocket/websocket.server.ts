import { WebSocket, WebSocketServer } from 'ws';
import { Server } from 'node:https';
import { IncomingMessage } from 'node:http';
import { WebsocketManager } from './websocket.manager';

const websocketManager = new WebsocketManager();

export function createWebsocketServer(server: Server) {
  const wss = new WebSocketServer({ server });

  wss.on('connection', (ws: WebSocket, req: IncomingMessage) => {
    const login: string | undefined = req.url;
    if (login) {
      websocketManager.register(login, ws);
      ws.on('message', data => {
        websocketManager.handleClientMessage(ws, data);
      });
      ws.on('close', () => {
        websocketManager.unregister(ws);
      });
    } else {
      ws.close();
    }
  });
  return websocketManager;
}
