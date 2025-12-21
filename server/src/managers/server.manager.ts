import { RawData, WebSocket, WebSocketServer } from 'ws';

export interface ServerManagerConfig {
  port: number;
}

export class ServerManager {
  private readonly webSocketServer: WebSocketServer;

  constructor(serverConfig: ServerManagerConfig) {
    this.webSocketServer = new WebSocketServer({ port: serverConfig.port });
    this.webSocketServer.on('connection', (ws: WebSocket) => this.clientConnected(ws));
    console.log('WebSocket server running on ws://localhost:8080');
  }

  private clientConnected(ws: WebSocket): void {
    console.log('client connected', ws);
    ws.on('message', (data: RawData) => this.clientToServer(ws, data));
    ws.on('error', () => this.clientDisconnected());
  }

  private serverToClient(ws: WebSocket, data: string): void {
    console.log('sent data to client', ws);
    ws.send(JSON.stringify(data));
  }

  private clientToServer(ws: WebSocket, data: RawData): void {
    const message: string = data.toString();
    console.log('Received:', message);
  }

  private clientDisconnected(): void {
    console.log('Client disconnected');
  }
}
