import { HexagonalGridStructure } from '@structures/hexagonal-grid/hexagonal-grid.structure';
import { CellState } from 'shared';
import { GameConfig } from '../game.config';

export function gameMapGenerator(gameConfig: GameConfig): HexagonalGridStructure<CellState> {
  //TODO game generator function
  return new HexagonalGridStructure<CellState>(
    gameConfig.mapWidth,
    gameConfig.mapHeight,
    gameConfig.initialGameState.arenaState.cells
  );
}
