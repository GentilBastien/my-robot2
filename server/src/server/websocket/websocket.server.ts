import { WebSocket, WebSocketServer } from 'ws';
import { IncomingMessage, Server } from 'node:http';
import { WebsocketManager } from '@server/websocket/websocket.manager';

const websocketManager = new WebsocketManager();

export function createWebsocketServer(server: Server) {
  const wss = new WebSocketServer({ server });

  wss.on('connection', (ws: WebSocket, req: IncomingMessage) => {
    const login: string | undefined = req.url;
    if (login) {
      if (websocketManager.isAlreadyRegistered(login)) {
        throw 'already registered';
      } else {
        websocketManager.register(login, ws);
      }
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
