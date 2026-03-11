import { FastifyInstance } from 'fastify';

export async function loginRoute(app: FastifyInstance) {
  app.post('/api/login', async (req, reply) => {
    // login logic
  });
}
