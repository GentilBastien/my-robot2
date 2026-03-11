import { GameConfig } from './game/game.config';
import { Game } from './game/game';
import { GameEventTypeEnum, GameStateTypeEnum, MovementTypeEnum, TurnStateTypeEnum } from 'shared';
import { PathGameEvent } from '@events/game.event';
import { createWebsocketServer } from './serv/websocket/websocket.server';
import * as https from 'node:https';
import { Server } from 'node:https';

/**
 * Program Entry point.
 */
// new ClientRegistry({
//   port: 8080,
// });

const gameConfig: GameConfig = {
  mapWidth: 10,
  mapHeight: 15,
  gameState: {
    state: GameStateTypeEnum.PENDING,
    robots: {},
    effects: [],
    arenaState: {
      cells: {},
    },
    turnState: {
      turnStateTypeEnum: TurnStateTypeEnum.PENDING,
      currentTurnNumber: 0,
      currentTurnRobotId: '',
    },
  },
};

const game = new Game(gameConfig);

const pathGameEvent: PathGameEvent = {
  gameEventType: GameEventTypeEnum.PATH,
  path: {
    costs: [1, 2, 5],
    coordinatesPath: [
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
    ],
  },
  sourceRobotId: '',
  actionTypeEnum: undefined,
  movementType: MovementTypeEnum.WALKED,
};
// game.receiveGameEventFromClient(pathGameEvent);

const server: Server = https.createServer();

const websocketManager = createWebsocketServer(server);

server.listen(8080, () => {
  console.log('Server running');
});
