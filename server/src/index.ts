import { GameConfig } from './game/game.config';
import { GameStateTypeEnum, TurnStateTypeEnum } from 'shared';
import { Game } from './game/game';

/**
 * Program Entry point.
 */
// new ServerManager({
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
