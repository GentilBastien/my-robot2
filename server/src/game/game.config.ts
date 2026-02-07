import { GameState } from '@states/game.state';

export interface GameConfig {
  gameState: GameState;
  mapWidth: number;
  mapHeight: number;
}
