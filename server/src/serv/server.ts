import Fastify from 'fastify';
import { createWebsocketServer } from './websocket/websocket.server';

const server = Fastify({ logger: true });

const websocketManager = createWebsocketServer(server.server);

server.listen(8080, () => {
  console.log('Server running');
});

// fastify.post('/', (request, response) => {
//
// })
