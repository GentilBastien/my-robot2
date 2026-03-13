import { FastifyInstance } from 'fastify';
import { loginRoute } from '@server/api/login.route';
import { robotDetailRoute } from '@server/api/robot-detail.route';

export const ParamConstants = {
  id: ':id',
};
export interface IdParams {
  id: string;
}

export async function registerRoutes(app: FastifyInstance) {
  const prefix = '/api/v1';
  await app.register(loginRoute, { prefix });
  await app.register(robotDetailRoute, { prefix });
}
