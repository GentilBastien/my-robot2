import Fastify from 'fastify';
import { createWebsocketServer } from '@server/websocket/websocket.server';
import { registerRoutes } from '@server/api/routes';

export async function createServer() {
  const fastifyServer = Fastify();

  createWebsocketServer(fastifyServer.server);
  await registerRoutes(fastifyServer);

  fastifyServer.listen({ port: 8080 }, () => {
    console.log('Server running on port 8080');
  });
}
