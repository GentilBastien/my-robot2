import { RawData, WebSocket, WebSocketServer } from 'ws';

export class ServerManager {
  private readonly webSocketServer: WebSocketServer;
  constructor(webSocketServer: WebSocketServer) {
    this.webSocketServer = webSocketServer;
    this.webSocketServer.on('connection', (ws: WebSocket) => this.clientConnected(ws));
  }

  private clientConnected(ws: WebSocket): void {
    console.log('client connected', ws);
    ws.on('message', (data: RawData) => this.clientSentData(ws, data));
    ws.on('error', () => this.clientDisconnected());
  }

  private clientSentData(ws: WebSocket, data: RawData): void {
    const message: string = data.toString();
    console.log('Received:', message);
  }

  private clientDisconnected(): void {
    console.log('Client disconnected');
  }
}

// wss.on('connection', (ws: WebSocket) => {
//   console.log('Client connected');
//
//   ws.on('message', data => {
//     const message = data.toString();
//     console.log('Received:', message);
//
//     ws.send(JSON.stringify({ type: 'echo', payload: message }));
//   });
//
//   ws.on('close', () => {
//     console.log('Client disconnected');
//   });
// });
//
// console.log('WebSocket server running on ws://localhost:8080');
