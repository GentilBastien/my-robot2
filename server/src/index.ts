import { WebSocketServer } from 'ws';
import { ServerManager } from './managers/server.manager.js';

const wss = new WebSocketServer({ port: 8080 });

new ServerManager(wss);
