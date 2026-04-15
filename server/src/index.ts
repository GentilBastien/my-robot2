import { GameConfig } from '@game/game.config';
import { GameStateTypeEnum, TurnStateTypeEnum } from 'shared';
import { Game } from '@game/game';
import { createServer } from '@server/server';

const gameConfig: GameConfig = {
  mapWidth: 2,
  mapHeight: 2,
  initialGameState: {
    state: GameStateTypeEnum.PENDING,
    robots: {},
    effects: [],
    arenaState: {
      cells: [
        {
          id: 'cell_1',
          coordinates: { x: 0, y: 0, z: 0 },
          weight: 2,
        },
        {
          id: 'cell_2',
          coordinates: { x: 0, y: 0, z: 0 },
          weight: 2,
        },
        {
          id: 'cell_3',
          coordinates: { x: 0, y: 0, z: 0 },
          weight: 2,
        },
        {
          id: 'cell_4',
          coordinates: { x: 0, y: 0, z: 0 },
          weight: 2,
        },
      ],
    },
    turnState: {
      turnStateTypeEnum: TurnStateTypeEnum.PENDING,
      currentTurnNumber: 0,
      currentTurnRobotId: '',
    },
  },
};

const game = new Game(gameConfig);
console.log(game);

createServer().then();
