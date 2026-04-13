import { GameState } from 'shared';

export interface GameConfig {
  initialGameState: GameState;
  mapWidth: number;
  mapHeight: number;
}
