import { FastifyInstance } from 'fastify';
import { LoginRequest } from 'shared';

export async function loginRoute(app: FastifyInstance) {
  app.post('/login', async (request, response) => {
    const { login, password } = request.body as LoginRequest;
    if (!login || !password) {
      return response.status(400).send({ error: 'Invalid login' });
    }
    return {
      token: 'fake-token',
    };
  });
}
