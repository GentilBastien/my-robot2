import { FastifyInstance } from 'fastify';
import { IdParams, ParamConstants } from '@server-api/routes';

export async function robotDetailRoute(app: FastifyInstance) {
  interface RobotDetail {
    id: string;
    name: string;
    hp: number;
  }
  const robots: RobotDetail[] = [
    { id: '1', name: 'Alpha', hp: 100 },
    { id: '2', name: 'Beta', hp: 80 },
  ];
  app.get<{ Params: IdParams }>(`/robots/${ParamConstants.id}`, async (request, response) => {
    const { id } = request.params;
    const robot = robots.find(r => r.id === id);
    if (!robot) {
      return response.status(404).send({ error: 'Robot not found' });
    }
    return robot;
  });
}
