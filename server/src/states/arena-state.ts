import { HexagonalGridStructure } from '@structures/hexagonal-grid/hexagonal-grid.structure';
import { TileState } from '@states/tile-state';

export interface ArenaState {
  grid: HexagonalGridStructure<TileState>;
}
