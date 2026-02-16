import { GameState } from 'shared';

export interface GameConfig {
  gameState: GameState;
  mapWidth: number;
  mapHeight: number;
}
