import { WebSocket, WebSocketServer } from 'ws';
import { IncomingMessage, Server } from 'node:http';
import { WebsocketManager } from '@server/websocket/websocket.manager';

const websocketManager = new WebsocketManager();

//entering a queue make u go to /dashboard/queue
//leaving the queue make you go to /dashboard

//when going to /queue  the Client must do
// const ws = new WebSocket("ws://localhost:8080/api/v1/game", [], {
//   headers: {
//     Authorization: "Bearer abc123"
//   }
// });
//to upgrade the http requests to persistent tcp requests

export function createWebsocketServer(server: Server): void {
  /**
   * Do not create an own HTTP server for websocket. Use the existing one.
   */
  const wss = new WebSocketServer({
    noServer: true,
  });

  server.on('upgrade', (request, socket, head) => {
    const { url } = request;
    // const authHeader = request.headers['authorization'];
    if (url !== '/api/v1/game') {
      socket.destroy();
      return;
    }

    wss.handleUpgrade(request, socket, head, ws => {
      wss.emit('connection', ws, request);
    });
  });

  wss.on('connection', (ws: WebSocket, req: IncomingMessage) => {
    const login: string | undefined = req.httpVersion; //TODO get login from IncomingMessage
    if (!login) {
      ws.close();
      throw 'Not logged in';
    }
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
  });
}
