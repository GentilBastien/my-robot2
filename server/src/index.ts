import { GameConfig } from './game/game.config';
import { Game } from './game/game';
import { GameEventTypeEnum, GameStateTypeEnum, MovementTypeEnum, TurnStateTypeEnum } from 'shared';
import { PathGameEvent } from '@events/game.event';
import { createServer } from '@server/server';

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

createServer().then();
