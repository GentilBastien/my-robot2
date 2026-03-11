import Fastify from 'fastify';
import { createWebsocketServer } from '@server/websocket/websocket.server';
import { registerRoutes } from '@server/api/routes';

export function createServer(): void {
  const fastifyServer = Fastify({ https: {} });

  createWebsocketServer(fastifyServer.server);
  registerRoutes(fastifyServer);

  fastifyServer.listen({ port: 8080 }, () => {
    console.log('Server running on port 8080');
  });
}
