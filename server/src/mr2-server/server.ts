import Fastify from 'fastify';
import { createWebsocketServer } from './websocket/websocket.server';
import { registerRoutes } from './api/routes';

const fastifyServer = Fastify({ https: {} });

createWebsocketServer(fastifyServer.server);
registerRoutes(fastifyServer);
fastifyServer.listen({ port: 8080 }, () => {
  console.log('Server running on port 8080');
});
