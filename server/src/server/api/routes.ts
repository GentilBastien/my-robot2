import { FastifyInstance } from 'fastify';
import { LoginRequest } from 'shared';

const IdParams = ':id';
interface IdParams {
  id: string;
}
export function registerRoutes(app: FastifyInstance) {
  const prefix = '/api/v1';
  app.register(loginRoute, { prefix });
  app.register(robotDetailRoute, { prefix });
}

// ROUTE DEFINITIONS

export function loginRoute(app: FastifyInstance): void {
  app.post('/login', (request, response) => {
    const { login, password } = request.body as LoginRequest;
    if (!login || !password) {
      return response.status(400).send({ error: 'Invalid login' });
    }
    return {
      token: 'fake-token',
    };
  });
}

export function robotDetailRoute(app: FastifyInstance): void {
  interface RobotDetail {
    id: string;
    name: string;
    hp: number;
  }
  const robots: RobotDetail[] = [
    { id: '1', name: 'Alpha', hp: 100 },
    { id: '2', name: 'Beta', hp: 80 },
  ];
  app.get<{ Params: IdParams }>(`/robots/${IdParams}`, (request, response) => {
    const { id } = request.params;
    const robot = robots.find(r => r.id === id);
    if (!robot) {
      return response.status(404).send({ error: 'Robot not found' });
    }
    return robot;
  });
}
